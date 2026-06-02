<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentCallbackController extends Controller
{
    public function handleMidtrans(Request $request)
    {
        $payload = $request->all();
        
        // In a real app, verify signature key
        // $signatureKey = hash('sha512', $payload['order_id'] . $payload['status_code'] . $payload['gross_amount'] . env('MIDTRANS_SERVER_KEY'));
        // if ($signatureKey !== $payload['signature_key']) {
        //     return response()->json(['message' => 'Invalid signature'], 403);
        // }

        $orderId = $payload['order_id'];
        $transactionStatus = $payload['transaction_status'];
        
        $order = Order::where('unique_code', $orderId)->first();
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $payment = $order->payments()->latest()->first();
        
        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            if ($payment) {
                $payment->update(['status' => 'paid']);
            }
            $order->update([
                'payment_status' => 'paid',
                'status' => 'paid_waiting'
            ]);
            event(new \App\Events\KitchenOrderUpdated($order));
        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            if ($payment) {
                $payment->update(['status' => 'failed']);
            }
            $order->update(['payment_status' => 'failed', 'status' => 'cancelled']);
        } elseif ($transactionStatus == 'pending') {
            if ($payment) {
                $payment->update(['status' => 'pending']);
            }
        }

        return response()->json(['message' => 'Success']);
    }
}

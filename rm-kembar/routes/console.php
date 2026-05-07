<?php

use App\Models\Order;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('rmkembar:expire-pending', function () {
    $expiredReservations = 0;
    $expiredOrders = 0;

    Reservation::query()
        ->whereIn('status', ['pending', 'confirmed'])
        ->whereNotNull('auto_cancel_at')
        ->where('auto_cancel_at', '<=', now())
        ->chunkById(100, function ($reservations) use (&$expiredReservations) {
            foreach ($reservations as $reservation) {
                $reservation->update([
                    'status' => 'auto_cancelled',
                    'cancelled_at' => now(),
                    'cancellation_reason' => 'Otomatis batal karena melewati batas waktu kedatangan.',
                ]);

                $expiredReservations++;
            }
        });

    Payment::query()
        ->with('payable')
        ->where('status', 'pending')
        ->whereNotNull('expired_at')
        ->where('expired_at', '<=', now())
        ->chunkById(100, function ($payments) use (&$expiredOrders) {
            foreach ($payments as $payment) {
                DB::transaction(function () use ($payment, &$expiredOrders) {
                    $payment->update(['status' => 'expired']);

                    $order = $payment->payable;
                    if (! $order instanceof Order || ! in_array($order->status, ['pending', 'paid_waiting'], true)) {
                        return;
                    }

                    if ($order->payment_status === 'paid') {
                        return;
                    }

                    $order->update([
                        'status' => 'cancelled',
                        'cancelled_at' => now(),
                        'cancellation_reason' => 'Otomatis batal karena pembayaran kedaluwarsa.',
                    ]);

                    $order->table?->update([
                        'status' => 'kosong',
                        'locked_at' => null,
                        'locked_by_order_id' => null,
                    ]);

                    $expiredOrders++;
                });
            }
        });

    $this->info("Expired {$expiredReservations} reservations and {$expiredOrders} orders.");
})->purpose('Expire stale reservations and unpaid orders');

Schedule::command('rmkembar:expire-pending')->everyMinute()->withoutOverlapping();

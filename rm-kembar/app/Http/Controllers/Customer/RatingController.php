<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function store(Request $request, Order $order)
    {
        // Ensure the order belongs to the user and is completed
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        if ($order->status !== 'completed') {
            return back()->withErrors(['rating' => 'Anda hanya bisa memberi ulasan pada pesanan yang sudah selesai.']);
        }

        // Check if already rated
        $existing = Rating::where('user_id', Auth::id())
            ->where('rateable_type', Order::class)
            ->where('rateable_id', $order->id)
            ->first();

        if ($existing) {
            return back()->withErrors(['rating' => 'Anda sudah memberi ulasan untuk pesanan ini.']);
        }

        $validated = $request->validate([
            'stars' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Rating::create([
            'user_id' => Auth::id(),
            'rateable_type' => Order::class,
            'rateable_id' => $order->id,
            'stars' => $validated['stars'],
            'comment' => $validated['comment'],
        ]);

        return back()->with('status', 'Terima kasih atas ulasan Anda!');
    }
}

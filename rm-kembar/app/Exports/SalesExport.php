<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SalesExport implements FromCollection, WithHeadings, WithMapping
{
    protected $from;
    protected $to;

    public function __construct(Carbon $from, Carbon $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    public function collection()
    {
        return Order::query()
            ->with(['user', 'table'])
            ->whereBetween('created_at', [$this->from, $this->to])
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'Kode',
            'Tanggal',
            'Customer',
            'Meja',
            'Status',
            'Pembayaran',
            'Subtotal',
            'PPN',
            'Total',
        ];
    }

    public function map($order): array
    {
        return [
            $order->unique_code,
            $order->created_at->format('Y-m-d H:i:s'),
            $order->user?->name,
            $order->table?->table_number,
            $order->status,
            $order->payment_status,
            $order->subtotal,
            $order->tax_amount,
            $order->total_price,
        ];
    }
}

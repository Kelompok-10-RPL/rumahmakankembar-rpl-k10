<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Penjualan RM Kembar</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1, h3 { text-align: center; }
        .total { text-align: right; font-weight: bold; margin-top: 20px; font-size: 14px; }
    </style>
</head>
<body>
    <h1>RM Kembar</h1>
    <h3>Laporan Penjualan</h3>
    <p>Periode: {{ $from->format('d M Y') }} - {{ $to->format('d M Y') }}</p>
    
    <table>
        <thead>
            <tr>
                <th>Kode</th>
                <th>Tanggal</th>
                <th>Customer</th>
                <th>Meja</th>
                <th>Status</th>
                <th>Pembayaran</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>{{ $order->unique_code }}</td>
                <td>{{ $order->created_at->format('Y-m-d H:i') }}</td>
                <td>{{ $order->user?->name ?? 'Guest' }}</td>
                <td>{{ $order->table?->table_number ?? '-' }}</td>
                <td>{{ $order->status }}</td>
                <td>{{ $order->payment_status }}</td>
                <td>Rp {{ number_format($order->total_price, 0, ',', '.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        Total Pendapatan: Rp {{ number_format($total_revenue, 0, ',', '.') }}
    </div>
</body>
</html>

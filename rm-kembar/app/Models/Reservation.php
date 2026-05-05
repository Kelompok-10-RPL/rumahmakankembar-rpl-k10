<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Reservation extends Model
{
    protected $fillable = [
        'unique_code',
        'user_id',
        'table_id',
        'order_id',
        'reserved_date',
        'reserved_time',
        'guest_count',
        'status',
        'notes',
        'auto_cancel_at',
        'cancelled_at',
        'cancellation_reason',
        'meta',
    ];

    protected $casts = [
        'reserved_date' => 'date',
        'auto_cancel_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(DineInTable::class, 'table_id');
    }

    public static function generateCode(): string
    {
        do {
            $code = 'RSV-'.Carbon::now()->format('ymd').'-'.Str::upper(Str::random(4));
        } while (static::query()->where('unique_code', $code)->exists());

        return $code;
    }
}

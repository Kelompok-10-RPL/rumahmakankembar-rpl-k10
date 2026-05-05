<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'unique_code',
        'user_id',
        'order_type',
        'dine_in_table_id',
        'subtotal',
        'tax_rate',
        'tax_amount',
        'total_price',
        'payment_status',
        'status',
        'notes',
        'cancellation_reason',
        'arrived_at',
        'preparing_at',
        'completed_at',
        'cancelled_at',
        'meta',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_rate' => 'decimal:4',
        'tax_amount' => 'decimal:2',
        'total_price' => 'decimal:2',
        'arrived_at' => 'datetime',
        'preparing_at' => 'datetime',
        'completed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(DineInTable::class, 'dine_in_table_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    public static function generateCode(?User $user = null): string
    {
        $name = $user ? Str::upper(Str::limit(Str::slug($user->name, ''), 5, '')) : 'GUEST';
        $date = Carbon::now()->format('ymd');

        do {
            $code = sprintf('RMK-%s-%s-%03d', $date, $name ?: 'GUEST', random_int(1, 999));
        } while (static::query()->where('unique_code', $code)->exists());

        return $code;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Payment extends Model
{
    protected $fillable = [
        'transaction_id',
        'payment_method',
        'payment_type',
        'amount',
        'status',
        'gateway_response',
        'paid_at',
        'expired_at',
        'meta',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'gateway_response' => 'array',
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
        'meta' => 'array',
    ];

    public function payable(): MorphTo
    {
        return $this->morphTo();
    }
}

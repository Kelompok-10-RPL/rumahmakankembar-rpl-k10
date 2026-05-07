<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DineInTable extends Model
{
    protected $appends = ['order_url'];

    protected $fillable = [
        'table_number',
        'capacity',
        'status',
        'locked_at',
        'locked_by_order_id',
        'qr_code_path',
        'location_label',
        'notes',
        'meta',
    ];

    protected $casts = [
        'locked_at' => 'datetime',
        'meta' => 'array',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function lockedByOrder(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'locked_by_order_id');
    }

    public function getOrderUrlAttribute(): string
    {
        return route('menu.index', ['table' => $this->table_number]);
    }
}

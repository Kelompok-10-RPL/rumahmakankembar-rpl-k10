<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class StockLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'menu_id',
        'changed_by',
        'change_type',
        'qty_before',
        'qty_change',
        'qty_after',
        'reason',
        'reference_type',
        'reference_id',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function reference(): MorphTo
    {
        return $this->morphTo();
    }
}

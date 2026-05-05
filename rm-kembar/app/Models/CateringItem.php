<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CateringItem extends Model
{
    protected $guarded = [];

    public function catering(): BelongsTo
    {
        return $this->belongsTo(Catering::class);
    }
}

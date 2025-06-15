<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'title',
        'body',
        'rating',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

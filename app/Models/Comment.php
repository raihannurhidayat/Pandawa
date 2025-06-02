<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'title',
        'body',
        'rating',
    ];

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

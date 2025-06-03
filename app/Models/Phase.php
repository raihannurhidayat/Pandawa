<?php

namespace App\Models;

use App\Traits\HasAttachments;
use App\Traits\HasRelativeTime;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    use HasRelativeTime, HasAttachments;

    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'title',
        'body',
        'status',
        'reason',
    ];

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

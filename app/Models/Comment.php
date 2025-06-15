<?php

namespace App\Models;

use App\Traits\HasRelativeTime;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    use HasRelativeTime;

    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'title',
        'body',
        'rating',
    ];

    public $hidden = [
        'commentable_id',
        'commentable_type',
        'user_id'
    ];

    public $appends = [
        'user'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getUserAttribute(): User
    {
        return $this->user()->first();
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

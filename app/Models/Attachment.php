<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Storage;

class Attachment extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'filename',
        'path',
    ];

    protected $appends = ['url'];

    public function attachable(): MorphTo
    {
        return $this->morphTo();
    }

    public function getUrlAttribute(): ?string
    {
        return Storage::url($this->path);
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

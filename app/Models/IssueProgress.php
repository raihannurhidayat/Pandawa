<?php

namespace App\Models;

use App\HasAttachments;
use App\HasRelativeTime;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IssueProgress extends Model
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

    public function issue(): BelongsTo
    {
        return $this->belongsTo(Issue::class);
    }

    private const templates = [[
        'title' => 'Pengaduan Diterima',
        'body' => 'Pengaduan ini telah diterima oleh admin dan sedang diproses',
    ]];

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

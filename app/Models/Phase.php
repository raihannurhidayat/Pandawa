<?php

namespace App\Models;

use App\Enums\PhaseStatus;
use App\Traits\HasAttachments;
use App\Traits\HasRelativeTime;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

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
        'order',
        'is_active',
        'activated_at',
    ];

    protected $casts = [
        'status' => PhaseStatus::class,
    ];

    /**
     * The phaseable entity that this phase belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function phaseable(): MorphTo
    {
        return $this->morphTo();
    }

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

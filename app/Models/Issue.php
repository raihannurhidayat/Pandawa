<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Enums\PhaseStatus;
use App\Traits\HasAttachments;
use App\Traits\HasComments;
use App\Traits\HasPhases;
use App\Traits\HasRelativeTime;
use App\IssueProgressTemplates;
use App\Models\Concerns\Comments;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Issue extends Model implements Commentable
{
    /** @use HasFactory<\Database\Factories\IssueFactory> */
    use HasFactory, HasAttachments, Comments, HasPhases, HasRelativeTime;

    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'title',
        'body',
        'user_id',
        'issue_category_id',
        'location',
        'status'
    ];

    public $casts = [
        'location' => 'array',
        'status' => PhaseStatus::class
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function isLikedBy(User $user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    public function issueCategory(): BelongsTo
    {
        return $this->belongsTo(IssueCategory::class);
    }

    /**
     * Filter issues by status.
     *
     * @param Builder $query
     * @param string $status
     * @return void
     */
    #[Scope]
    public function scopeStatus(Builder $query, string $status): void
    {
        $query->where('status', $status);
    }

    public function archive(): void
    {
        $this->status = PhaseStatus::Closed;
        $this->save();
    }

    public static function booted(): void
    {
        static::creating(function (self $model) {
            $model->id = (string) Str::orderedUuid();
        });

        static::created(function (self $model) {
            // create initial phases
            foreach (IssueProgressTemplates::ISSUE_PROGRESS_TEMPLATES as $step => $phase) {
                $model->phases()->create([
                    'title' => $phase[PhaseStatus::Pending->value]['title'],
                    'body' => $phase[PhaseStatus::Pending->value]['body'],
                    'reason' => $phase[PhaseStatus::Pending->value]['reason'] ?? null,
                    'order' => $step,
                    'is_active' => $step === 0,
                    'activated_at' => $step === 0 ? now() : null,
                    'status' => $phase[PhaseStatus::Pending->value]['status'],
                ]);
            }
        });
    }
}

<?php

namespace App\Models;

use App\IssueStatus;
use App\HasAttachments;
use App\HasRelativeTime;
use App\IssueProgressTemplates;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Issue extends Model
{
    /** @use HasFactory<\Database\Factories\IssueFactory> */
    use HasFactory, HasAttachments, HasRelativeTime;

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
        'status' => IssueStatus::class
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function issueCategory(): BelongsTo
    {
        return $this->belongsTo(IssueCategory::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(IssueProgress::class);
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
        $this->status = IssueStatus::Closed;
        $this->save();
    }

    public static function booted(): void
    {
        static::creating(function (self $model) {
            $model->id = (string) Str::orderedUuid();
        });

        static::created(function (self $model) {
            // create initial progresses
            foreach (IssueProgressTemplates::ISSUE_PROGRESS_TEMPLATES as $step => $progress) {
                $model->progress()->create([
                    'title' => $progress[IssueStatus::Pending->value]['title'],
                    'body' => $progress[IssueStatus::Pending->value]['body'],
                    'status' => $progress[IssueStatus::Pending->value]['status'],
                ]);
            }
        });
    }
}

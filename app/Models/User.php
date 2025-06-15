<?php

namespace App\Models;

use App\Contracts\Commentable;
use Illuminate\Support\Str;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'profile_photo_path',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'profile_photo_path',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'address' => 'array',
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getProfilePhotoUrlAttribute(): ?string
    {
        return Storage::url($this->profile_photo_path);
    }

    public function getRouteKeyName()
    {
        return 'username';
    }

    /**
     * Get all of the user's comments.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\Comment>
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Create a new comment associated with the given commentable model.
     *
     * @param \App\Contracts\Commentable $commentable The model to associate the comment with.
     * @param string $comment The content of the comment.
     * @return $this
     */
    public function comment(Commentable $commentable, string $comment): self
    {
        $comment = new Comment([
            'body' => $comment,
        ]);

        $comment
            ->user()->associate($this)
            ->commentable()->associate($commentable)
            ->save();

        return $this;
    }

    /**
     * Check if the user has commented on a commentable model.
     *
     * @param \App\Contracts\Commentable $commentable
     * @return bool
     */
    public function hasCommented(Commentable $commentable): bool
    {
        if (! $commentable->exists) {
            return false;
        }

        return $this->comments()
            ->whereHas('user', fn($query) => $query->where('id', $this->id))
            ->exists();
    }


    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->id = (string) Str::orderedUuid();
        });
    }
}

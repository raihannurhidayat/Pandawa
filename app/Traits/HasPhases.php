<?php

namespace App\Traits;

use App\Models\Phase;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasPhases
{
    /**
     * The phases that belong to the model.
     */
    public function phases(): MorphMany
    {
        return $this->morphMany(Phase::class, 'phaseable')->orderBy('order');
    }

    /**
     * The current active phase.
     *
     * @return \App\Models\Phase|null
     */
    public function currentPhase(): ?Phase
    {
        return $this->phases()->where('is_active', true)->first();
    }

    public function activatePhase(Phase $phase): void
    {
        $this->phases()->update(['is_active' => false]);
        $this->phases()->updateExistingPivot($phase, ['is_active' => true]);
        $this->phases()->updateExistingPivot($phase, ['activated_at' => now()]);
    }
}

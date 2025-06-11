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

    /**
     * Activate a specified phase, optionally activating the next phase in order.
     *
     * @param \App\Models\Phase $phase The phase to activate.
     * @param bool $next If true, activate the next phase in order instead.
     *
     * This method first deactivates all phases, then activates the specified phase or the next phase
     * in order, depending on the value of $next. It also updates the activation timestamp.
     */
    public function activatePhase(Phase $phase, bool $next = false): void
    {
        if ($next) {
            $phase = $this->phases()->where('order', '>', $phase->order)->orderBy('order')->first();
        }

        $this->phases()->update(['is_active' => false]);

        $phase->update(['is_active' => true, 'activated_at' => now()]);
    }
}

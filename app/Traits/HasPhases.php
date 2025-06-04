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
        return $this->morphMany(Phase::class, 'phaseable');
    }
}

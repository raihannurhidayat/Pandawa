<?php

namespace App\Traits;

use Carbon\Carbon;

trait HasRelativeTime
{
    /**
     * Boot the trait and automatically append relative time attributes
     */
    public static function bootHasRelativeTime()
    {
        // This method is called when the model is booted
    }

    /**
     * Initialize the trait and add the relative time attributes to appends
     */
    public function initializeHasRelativeTime()
    {
        $this->append([
            'created_at_relative',
            'updated_at_relative',
            'created_at_formatted',
            'updated_at_formatted'
        ]);
    }

    /**
     * Get the relative time for created_at in Indonesian
     */
    public function getCreatedAtRelativeAttribute()
    {
        return $this->getRelativeTime($this->created_at);
    }

    /**
     * Get the relative time for updated_at in Indonesian
     */
    public function getUpdatedAtRelativeAttribute()
    {
        return $this->getRelativeTime($this->updated_at);
    }

    /**
     * Get formatted created_at date
     */
    public function getCreatedAtFormattedAttribute()
    {
        return $this->created_at ? $this->created_at->format('d/m/Y') : null;
    }

    /**
     * Get formatted updated_at date
     */
    public function getUpdatedAtFormattedAttribute()
    {
        return $this->updated_at ? $this->updated_at->format('d/m/Y') : null;
    }

    /**
     * Helper method to calculate relative time in Indonesian
     */
    private function getRelativeTime($date)
    {
        if (!$date) return null;

        $inputDate = Carbon::parse($date);
        $now = Carbon::now();

        if ($inputDate->isFuture()) {
            return 'dalam ' . $now->diffForHumans($inputDate, true);
        } else {
            return $inputDate->diffForHumans($now);
        }
    }

    /**
     * Get relative time for any date field
     *
     * @param string $field
     * @return string|null
     */
    public function getRelativeTimeFor($field)
    {
        if (!$this->{$field}) return null;

        return $this->getRelativeTime($this->{$field});
    }

    /**
     * Get formatted date for any date field
     *
     * @param string $field
     * @param string $format
     * @return string|null
     */
    public function getFormattedDateFor($field, $format = 'd/m/Y')
    {
        if (!$this->{$field}) return null;

        return $this->{$field}->format($format);
    }
}

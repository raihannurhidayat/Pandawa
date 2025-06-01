<?php

namespace App;

use App\Models\Attachment;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Storage;

trait HasAttachments
{
    public function attachments(): MorphMany
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }

    public function addAttachment($file): Attachment
    {
        $path = $file->store('attachments');

        return $this->attachments()->create([
            'filename' => $file->getClientOriginalName(),
            'path' => $path,
        ]);
    }

    public function removeAttachment(Attachment $attachment): bool
    {
        // Optional: Delete physical file too
        Storage::delete($attachment->path);
        return $attachment->delete();
    }
}

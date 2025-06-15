<?php

namespace App\Http\Requests\Comment;

use App\Contracts\Commentable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'commentable_type' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (! class_exists($value, true)) {
                        $fail($value . " is not an existing class");
                    }

                    if (! in_array(Model::class, class_parents($value))) {
                        $fail($value . " is not Illuminate\Database\Eloquent\Model");
                    }

                    if (! in_array(Commentable::class, class_implements($value))) {
                        $fail($value . " is not App\Contracts\Commentable");
                    }
                },
            ],

            // the id of the liked object
            'id' => [
                "required",
                "string",
                function ($attribute, $value, $fail) {
                    $class = $this->input('commentable_type');

                    if (! $class::where('id', $value)->exists()) {
                        $fail($value . " does not exists in database");
                    }
                },
            ],

            'comment' => ['required', 'string'],
        ];
    }

    public function commentable(): Commentable
    {
        $class = $this->input('commentable_type');

        return $class::findOrFail($this->input('id'));
    }
}

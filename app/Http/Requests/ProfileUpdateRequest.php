<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => [
                'required_without_all:photo,location.provinsi,location.kota,location.kecamatan,location.kelurahan',
                'string',
                'alpha_dash',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id)
            ],
            'name' => [
                'required_without_all:photo,location.provinsi,location.kota,location.kecamatan,location.kelurahan',
                'string',
                'max:255'
            ],
            'email' => [
                'required_without_all:photo,location.provinsi,location.kota,location.kecamatan,location.kelurahan',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id)
            ],
            'photo' => [
                'required_without_all:username,name,email,location.provinsi,location.kota,location.kecamatan,location.kelurahan',
                'image',
                'mimes:png,jpg,jpeg',
                'max:2048'
            ],

            // location itself can be omitted, but if present must be an array (i.e. not null)
            'location' => ['sometimes', 'array'],

            // each nested field may be sent on its own, but cannot be null
            'location.provinsi' => ['sometimes', 'string'],
            'location.kota' => ['sometimes', 'string'],
            'location.kecamatan' => ['sometimes', 'string'],
            'location.kelurahan' => ['sometimes', 'string'],
        ];
    }
}

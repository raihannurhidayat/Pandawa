<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('profile/edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // dd($request->all());
        $user = $request->user();

        // 1) If the photo form was submitted, swap the image:
        if ($request->hasFile('photo')) {
            // delete old
            if ($user->profile_photo_path) {
                Storage::delete($user->profile_photo_path);
            }
            // store new
            $user->profile_photo_path = $request
                ->file('photo')
                ->store('public/profile-photos');
        }

        // 2) Otherwise (or in addition) fill username/name/email if they came through:
        if ($request->filled('name') || $request->filled('email') || $request->filled('username')) {
            $user->fill($request->only('name', 'email', 'username'));

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function show(User $user)
    {
        return Inertia::render('profile', [
            'user' => $user
        ]);
    }

    public function usernameCheck(Request $request)
    {
        $request->validate([
            'username' => 'required|string|alpha_dash',
        ]);

        $exists = User::where('username', $request->username)
            ->where('id', '!=', auth()->id())
            ->exists();

        return response()->json([
            'available' => !$exists,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class OnboardingController extends Controller
{
    public function onboarding()
    {
        return Inertia::render('onboarding');
    }
}

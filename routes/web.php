<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');


Route::resource('/pengaduan', IssueController::class)->middleware(['auth']);

Route::get('/dashboard', function () {
    return Inertia::render('admin/dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    // Check if user is admin or user
    Route::get('/onboarding', [OnboardingController::class, 'onboarding'])->name('onboarding');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User
    Route::get('/user/dashboard', [UserController::class, 'index'])->name('user.dashboard');
    Route::get('/user/pengaduan', [UserController::class, 'pengaduan'])->name('user.pengaduan');
    Route::get('/user/pengaduan/create', [UserController::class, 'create'])->name('user.pengaduan.create');
    Route::post('/user/pengaduan', [UserController::class, 'store'])->name('user.pengaduan.store');
});

require __DIR__ . '/auth.php';

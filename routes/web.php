<?php

use App\Http\Controllers\CommentController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OnboardingController;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// })->name('welcome');


Route::get('/profile/@{user}', [ProfileController::class, 'show'])->name('profile.show');

Route::get('/username-check', [ProfileController::class, 'usernameCheck'])->name('username.check');

Route::get('/', [LandingController::class, 'index'])->name('landing');

// Route untuk menampilkan semua issues (public)
Route::get('/issues', [LandingController::class, 'issues'])->name('issues.public');

// Route untuk menampilkan detail issue tertentu (public)
Route::get('/issues/{issue}', [LandingController::class, 'showIssue'])
    ->name('issues.show.public');

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

    // Global
    Route::get('/user/pengaduan-warga', [UserController::class, 'pengaduanWarga'])->name('user.pengaduan-warga');
    Route::get('/user/pengaduan-warga/{issueId}', [UserController::class, 'detailPengaduanWarga'])->name('user.detail.pengaduan-warga');

    // Utils
    Route::post('/user/{issue}/like', [UserController::class, 'toggle'])->name("user.like");
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');


    // Issue Phase control
    Route::put('/phase-update/{id}', [IssueController::class, 'updatePhase'])->name('phase.update');
    Route::put('/phase-resolve/{id}', [IssueController::class, 'resolvePhase'])->name('phase.resolve');
});

require __DIR__ . '/auth.php';

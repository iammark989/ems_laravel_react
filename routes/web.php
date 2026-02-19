<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;


// GET //
        // GO TO LOGIN PAGE //
Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware('signInCheck');

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware('signInCheck');


// POST //

Route::post('/login',[UserController::class,'login']);

require __DIR__.'/settings.php';

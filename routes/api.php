<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\MessageController;


Route::resource("user", UserController::class)->middleware('tokens');
Route::resource("message", MessageController::class)->middleware('tokens');

Route::post('/message/all', [MessageController::class, 'all'])->middleware('tokens');
Route::get('/unauthorized', function () {
    return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
})->name('login');

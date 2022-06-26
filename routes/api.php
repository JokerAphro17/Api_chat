<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\MessageController;


Route::resource("user", UserController::class);

Route::resource("message", MessageController::class);
Route::post("user/register", [UserController::class, "register"]);


Route::post('/message/all', [MessageController::class, 'all']);


Route::get('/unauthorized', function () {
    return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
});

 Route::post('/login', [UserController::class, 'login']);

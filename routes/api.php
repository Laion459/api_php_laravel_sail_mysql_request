<?php

use App\Http\Controllers\UsersController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/users', [UsersController::class,'store']);
Route::get('/users', [UsersController::class,'index']);
Route::delete('/users/{email}', [UsersController::class, 'destroyByEmail']);
Route::put('/users/{email}', [UsersController::class, 'updateByEmail']);

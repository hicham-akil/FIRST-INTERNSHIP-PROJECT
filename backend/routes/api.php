<?php

use App\Http\Controllers\AuthentificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/Signin',[AuthentificationController::class,'Signin']);
Route::post('/Signup',[AuthentificationController::class,'Signup']);
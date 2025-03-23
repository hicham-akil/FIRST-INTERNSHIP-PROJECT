<?php

use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/Signin',[AuthentificationController::class,'Signin']);
Route::post('/Signup',[AuthentificationController::class,'Signup']);
//project routes
Route::get('/project',[ProjectController::class,'index']);
Route::post('/create',[ProjectController::class,'store']);
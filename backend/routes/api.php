<?php

use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/Signin',[AuthentificationController::class,'Signin']);
Route::post('/Signup',[AuthentificationController::class,'Signup']);
//project routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/project', [ProjectController::class, 'index']);
    Route::post('/create', [ProjectController::class, 'store']);
    Route::put('/update/{idproject}/status', [ProjectController::class, 'update']);

    Route::post('/sendmessage', [MessageController::class, 'sendMessage']);
    Route::post('/sendMessageToAdmin', [MessageController::class, 'sendMessageToAdmin']);
    Route::get('/getMessagesForReceiver', [MessageController::class, 'getMessagesForReceiver']);
Route::get('/messages/{userId}', [MessageController::class, 'getMessagesByUserId']);

    Route::get('/getUserProjects', [ProjectController::class, 'getUserProjects']);


});
Route::get('/login', [AuthentificationController::class, 'showLoginForm'])->name('login');
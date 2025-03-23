<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthentificationController extends Controller
{

    public function Signin(Request $request){
        try {
            $data = $request->validate([
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',
            ]);
            
            if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
                $user = Auth::user();
                $token = $user->createToken('API token')->plainTextToken;
                return response()->json([
                    'message' => 'User signed in successfully',
                    'user' => $user,
                    'token' => $token,
                ]);
            } else {
                return response()->json([
                    'message' => 'Invalid credentials',
                ], 401);
            }
        } catch (\Exception $e) {
            Log::error('Signin Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went wrong.',
            ], 500);
        }
    }
    
    public function Signup(Request $request){
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8', 
            ]);
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);
    
            if (!$user) {
                return response()->json([
                    'message' => 'User creation failed.',
                ], 500);
            }
            Auth::login($user);
            $token = $user->createToken('API token')->plainTextToken;
            
            return response()->json([
                'message' => 'User signup successfully',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            Log::error('Signup Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went wrong.',
            ], 500);
        }
    }
}    
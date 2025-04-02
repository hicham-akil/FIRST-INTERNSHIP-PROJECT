<?php

namespace App\Http\Controllers;

use App\Models\Admine;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthentificationController extends Controller
{
    // Handles user authentication and token generation
    public function Signin(Request $request){
        try {
            $data = $request->validate([
                'email' => 'required|string|email|max:255',
                'password' => 'required|string|min:8',
            ]);
            
            if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
                $user = Auth::user();
                $token = $user->createToken('API token')->plainTextToken;
                if (Admine::where('user_id', $user->id)->exists()) {
                    return response()->json([
                        'message' => 'Admin signed in successfully',
                        'user' => $user,
                        'is_admin' => true,
                        'token' => $token,
                    ]);
                }
                return response()->json([
                    'message' => 'User signed in successfully',
                    'user' => $user,
                    'is_admin' => false,
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
    
    // Registers a new user and associates them with a client profile
    public function Signup(Request $request){
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8', 
            ]);
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);
            $dataclient = $request->validate([
                'client_type' => 'required|string|max:255',
                'company_name' => 'required|string|min:5', 
            ]);
    
            $dataclient['user_id'] = $user->id;
            Client::create($dataclient);
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
                'client' => $dataclient,
            ]);
        } catch (\Exception $e) {
            Log::error('Signup Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went wrong.',
            ], 500);
        }
    }
}
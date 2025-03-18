<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthentificationController extends Controller
{
    //
    public function Signin(Request $request){
        
        $data=$request->validate([
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
        
    }
    public function Signup(Request $request){
        
        $data=$request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8', 
        ]);
        $data['password'] = Hash::make($data['password']);
        $user=User::create($data);
        if (!$user) {
            return response()->json([
                'message' => 'User creation failed.',
            ], 500);
        };
    
        $user=Auth::user();
        $token=$user->createToken('API token')->plainTextToken;
         return response()->json([
                'message'=>'user Signin successfly',
                'user' => $user,
                'token' => $token,
            ]);
        }
  
}

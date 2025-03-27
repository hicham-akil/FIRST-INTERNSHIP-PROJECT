<?php

namespace App\Http\Controllers;

use App\Events\MessageReceived;
use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  
    
    public function sendMessage(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'message' => 'required|string',
        ]);
    
        // Find the user with the given email
        $receiver = User::where('email', 'hichamakil2018@gmail.com')->first();
    
        if (!$receiver) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $user=Auth::user();
        $iduser=$user->id;
        // Create the message and save it in the database
        $message = Message::create([
            'sender_id' => $iduser,
            'receiver_id' => $receiver->id,
            'message' => $request->message,
        ]);
    
        // Optionally, return the sent message as a response (you can send it back to the frontend)
        return response()->json([
            'success' => 'Message sent successfully',
            'message' => $message,
        ]);
    }
//     public function getMessages($email)
// {
//     // Find the user by email
//     $user = User::where('email', $email)->first();

//     if (!$user) {
//         return response()->json(['error' => 'User not found'], 404);
//     }

//     // Fetch messages for the user (receiver_id or sender_id)
//     $messages = Message::where('receiver_id', $user->id)
//                         ->orWhere('sender_id', $user->id)
//                         ->get();

//     return response()->json([
//         'success' => true,
//         'messages' => $messages
//     ]);
// }
  
    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}

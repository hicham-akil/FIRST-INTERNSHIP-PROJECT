<?php

namespace App\Http\Controllers;

use App\Models\Admine;
use App\Models\Client;
use App\Models\Message;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // Send a message (only clients can send messages to the admin)
   public function sendMessage(Request $request)
{
    $user = Auth::user();

    // Check if the user is an admin
    $admin = Admine::where('user_id', $user->id)->first();

    if ($admin) {
        // Validate that both project_id and message are provided
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'message' => 'required|string',
        ]);

        // Get the project by its ID
        $project = Project::find($request->project_id);

        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        // The receiver of the message is the user who created the project
        $receiverId = $project->user_id;  // User who created the project

        // Create the message
        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $receiverId,
            'project_id' => $project->id,
            'message' => $request->message,
        ]);

        // Optionally, push the message to a chat channel via Pusher or other methods

        return response()->json(['message' => 'Message sent successfully', 'data' => $message]);
    }

    return response()->json(['error' => 'Unauthorized: Only admins can send messages'], 403);
}

    

    // Get messages for the admin (messages received by the admin)
    public function getMessagesForReceiver()
    {
        // Get the currently authenticated user's ID
        $userId = Auth::id();

        // Fetch messages where receiver_id matches the authenticated user's ID
        $messages = Message::where('receiver_id', $userId)->get();

        // Return the messages as a JSON response
        return response()->json($messages);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    // }

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

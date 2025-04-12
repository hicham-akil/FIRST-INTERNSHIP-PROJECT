<?php

namespace App\Http\Controllers;

use App\Models\Admine;
use App\Models\Client;
use App\Models\Message;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // Import Log facade

class MessageController extends Controller
{
    // Admin sends a message to a project owner
    public function sendMessage(Request $request)
    {
        Log::info('Admin sendMessage request received', ['request_data' => $request->all()]);

        $user = Auth::user();
        $admin = Admine::where('user_id', $user->id)->first();

        if ($admin) {
            $request->validate([
                'project_id' => 'required|exists:projects,id',
                'message' => 'required|string',
            ]);

            $project = Project::find($request->project_id);
            if (!$project) {
                Log::error('Project not found', ['project_id' => $request->project_id]);
                return response()->json(['error' => 'Project not found'], 404);
            }

            $message = Message::create([
                'sender_id' => $user->id,
                'receiver_id' => $project->user_id,
                'project_id' => $project->id,
                'message' => $request->message,
            ]);

            Log::info('Message sent successfully', ['message' => $message]);
            return response()->json(['message' => 'Message sent successfully', 'data' => $message]);
        }

        Log::warning('Unauthorized access attempt by non-admin user', ['user_id' => $user->id]);
        return response()->json(['error' => 'Unauthorized: Only admins can send messages'], 403);
    }

    // Client sends a message to the admin
    public function sendMessageToAdmin(Request $request)
    {
        Log::info('Client sendMessageToAdmin request received', ['request_data' => $request->all()]);

        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();

        if ($client) {
            $request->validate([
                'project_id' => 'required|exists:projects,id',
                'message' => 'required|string',
            ]);

            $admin = Admine::first(); // Adjust based on how admins are managed
            if (!$admin) {
                Log::error('Admin not found');
                return response()->json(['error' => 'Admin not found'], 404);
            }

            $message = Message::create([
                'sender_id' => $user->id,
                'receiver_id' => $admin->user_id,
                'project_id' => $request->project_id,
                'message' => $request->message,
            ]);

            Log::info('Message sent to admin successfully', ['message' => $message]);
            return response()->json(['message' => 'Message sent successfully', 'data' => $message]);
        }

        Log::warning('Unauthorized access attempt by non-client user', ['user_id' => $user->id]);
        return response()->json(['error' => 'Unauthorized: Only clients can send messages'], 403);
    }

    // Retrieve messages from a specific sender within a project
    public function getMessagesByUserId($userId, $projectId)
    {
        Log::info('Fetching messages for project', ['user_id' => $userId, 'project_id' => $projectId]);

        $messages = Message::where('receiver_id', Auth::id())
            ->where('project_id', $projectId)
            ->where('sender_id', $userId)
            ->get();

        Log::info('Messages fetched', ['messages_count' => $messages->count()]);

        return response()->json([
            'messages' => $messages,
            'message' => $messages->isEmpty() ? 'No messages found' : 'Messages retrieved successfully'
        ], 200);
    }

    // Retrieve messages received by the authenticated user
    public function getMessagesForReceiver()
    {
        Log::info('Fetching messages for receiver', ['receiver_id' => Auth::id()]);

        $messages = Message::where('receiver_id', Auth::id())->get();
        Log::info('Messages fetched for receiver', ['messages_count' => $messages->count()]);

        return response()->json($messages);
    }

    // Display a specific message (Not implemented)
    public function show(Message $message)
    {
        //
    }

    // Display form for editing a message (Not implemented)
    public function edit(Message $message)
    {
        //
    }

    // Update a message (Not implemented)
    public function update(Request $request, Message $message)
    {
        //
    }

    // Delete a message (Not implemented)
    public function destroy(Message $message)
    {
        //
    }
}

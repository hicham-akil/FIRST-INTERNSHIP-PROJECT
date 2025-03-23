<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data=Project::all();
        return response()->json([
            'success'=>true,
            'message'=>'Data passed ',
            'data'=>$data,            
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();
    
            // Check if user is authenticated
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User is not authenticated',
                ], 401);
            }
    
            $user_id = $user->id;
    
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
            ]);
    
            $data['user_id'] = $user_id;
    
            Project::create($data);
    
            return response()->json([
                'success' => true,
                'message' => 'Project created successfully',
                'data' => $data,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error creating project: ' . $e->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the project.',
            ], 500);
        }
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}

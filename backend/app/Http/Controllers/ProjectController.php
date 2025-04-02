<?php

namespace App\Http\Controllers;

use App\Models\Admine;
use App\Models\File;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller;


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
    public function getUserProjects()
    {
        // Get the current authenticated user
        $user = Auth::user();

        // Fetch all projects where the user is the receiver (user_id is the receiver)
        $projects = Project::where('user_id', $user->id)
                           ->get();

        return response()->json([
            'projects' => $projects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();
    
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User is not authenticated',
                ], 401);
            }
    
            $user_id = $user->id;
    
          
            $data = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'required|string',
            ]);
    
            $data['user_id'] = $user_id;
    
        
            $project = Project::create($data);
            $project_id = $project->id;

            // Check if file exists
            if ($request->hasFile('file')) {
           
                $file = $request->file('file')->store('file', 'public');      

                // Prepare additional file data
                $datafile = [
                    'user_id'    => $user_id,
                    'project_id' => $project_id,
                    'file'=>$file
                  
                ];

                File::create($datafile);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'File is missing in the request',
                ], 400);
            }
    
            return response()->json([
                'success'   => true,
                'message'   => 'Project created successfully',
                'data'      => $data,
                'datafile'  => $datafile ?? [],
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error creating project: ' . $e->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'An error occurred while creating the project.',
            ], 500);
        }
    }
    

    
    public function AddFieldsByAdmin(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User is not authenticated',
                ], 401);
            }

            $user_id = $user->id;
            $adminex = Admine::where('user_id',$user_id)->get();
            $project_id = $request->input('project_id');
            Log::info('Request Data:', $request->all());
            Log::info('Project ID:', ['project_id' => $request->input('project_id')]);
            
            if (!$adminex) {
                return response()->json([
                    'success' => false,
                    'message' => 'User is not authorized',
                ], 403);
            }

            $project = Project::find($project_id);

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project not found',
                ], 404);
            }

            $data = $request->validate([
                'priority' => 'required|string|max:255',
                'estimated_completion' => 'required|date',
            ]);

            $project->priority = $data['priority'];
            $project->estimated_completion = $data['estimated_completion'];
            $project->save();

            return response()->json([
                'success' => true,
                'message' => 'Project fields added successfully',
                'data' => $data,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating project: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while updating the project.',
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
    public function update(Request $request,$idproject)
    {
        $newstatus=$request->input('status');
        $project=Project::find($idproject);
        $project->status=$newstatus;
        $project->save();
        return response()->json([
            'success' => true,
            'message' => 'Project updated succesfuly',
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($projectId)
    {
        //
        $project=Project::find($projectId);
        $project->delete();
        return Response()->json([
            'deleted'=>true,
        ]);
    }
}

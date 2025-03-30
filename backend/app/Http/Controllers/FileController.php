<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use function Laravel\Prompts\error;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */    
    public function index(Request $request)
    {
        // Get project ID from request
        $project_id = $request->input('project_id');
    
        // Log to verify if the project_id is being passed correctly
        Log::info('Project ID:', ['project_id' => $project_id]);
    
        // Fetch files from the database based on project_id
        $files = File::where('project_id', $project_id)->get();
    
        // Log to verify the files fetched from the database
        Log::info('Files fetched:', ['files' => $files]);
    
        // Check if files exist and if the 'file' field is available for each file
        $files->transform(function ($file) {
            // Assuming you are storing the file path in 'file' column in the database
            if ($file->file) {
                // If needed, you can create a full URL for the file
                $file->file_path = asset('storage/' . $file->file);
            } else {
                // Handle cases where there is no file associated with this entry
                $file->file_path = null;
            }
            return $file;
        });
    
        // Return files as JSON with the full file path
        return response()->json([
            'files' => $files,
        ], 200);
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
    //  */
    // public function store(Request $request)
    // {
    //     //
    //     try{

    //         $user=Auth::user();
    //         $user_id=$user->id;
    //         $project_id=$request->input('project_id');
    //         $data=$request->validate([
    //             'file_name'=>
    //             'file_path'=>
    //             'file_type'=>
    //         ]);
    //         $data['user_id']=$user_id;
    //         $data['project_id']=$project_id;
    //         Project::create($data);
    //         return response()->json([
    //             'data'=>$data,
    //         ],200);
    //     }catch(Exception $error){
    //         log::info($error->getMessage());
    //         return response()->json([
    //             'error'=>$error->getMessage(),
    //         ],404);
    //     }

    // }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        //
    }
}

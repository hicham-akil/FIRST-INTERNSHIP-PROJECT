<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller;

class FileController extends Controller
{
    // Retrieve a list of files for a specific project
    public function index(Request $request)
    {
        $project_id = $request->input('project_id');
        Log::info('Project ID:', ['project_id' => $project_id]);
        
        $files = File::where('project_id', $project_id)->get();
        Log::info('Files fetched:', ['files' => $files]);
        
        $files->transform(function ($file) {
            $file->file_path = $file->file ? asset('storage/' . $file->file) : null;
            return $file;
        });
        
        return response()->json(['files' => $files], 200);
    }
    
    // Display form for creating a new file (Not implemented)
    public function create()
    {
        //
    }
    
    // Display a specific file
    public function show(File $file)
    {
        //
    }
    
    // Display form for editing a file (Not implemented)
    public function edit(File $file)
    {
        //
    }
    
    // Update file details (Not implemented)
    public function update(Request $request, File $file)
    {
        //
    }
    
    // Delete a file (Not implemented)
    public function destroy(File $file)
    {
        //
    }
}

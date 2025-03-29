<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\error;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $user_id = $user->id;
        $project_id = $request->input('project_id');
    
        // Fetch files associated with the user and project
        $files = File::where('user_id', $user_id)->where('project_id', $project_id)->get();
    
        // Return files as JSON
        return response()->json([
            'file' => $files,
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

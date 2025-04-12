<?php

namespace App\Http\Controllers;

use App\Models\opinion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OpinionController
{
    //
    public function store(Request $request){
      $data=$request->validate([
        'opinion_message'=>'required|string|max:50',
      ]);
      $user=Auth::user();
      $user_id=$user->id;
      $data['user_id']=$user_id;
      opinion::create($data);
      return response()->json([
        'sucess'=>true,
        'data'=>$data
      ]);


    }
    public function index(){
      $user=Auth::user();
      $user_id=$user->id;
      Log::error($user_id);
      $opinions=opinion::whereNot('user_id',$user_id)->with('client')->get();
      
      return response()->json([
        'sucess'=>true,
        'data'=>$opinions,
      ]);
    }
    public function useropinion(){
      $user=Auth::user();
      $user_id=$user->id;
      
      $opinion=opinion::where('user_id',$user_id)->with('client')->get();
      
      return response()->json([
        'sucess'=>true,
        'data'=>$opinion,
      ]);
    }
    public function delete(){
      $user=Auth::user();
      $user_id=$user->id;
      
      $opinion=opinion::where('user_id',$user_id)->delete();
      return response()->json([
        'sucess'=>true,
      ]);
    }
}

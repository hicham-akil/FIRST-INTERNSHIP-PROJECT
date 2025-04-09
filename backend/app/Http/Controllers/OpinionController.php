<?php

namespace App\Http\Controllers;

use App\Models\opinion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}

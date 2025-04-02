<?php
namespace App\Http\Controllers;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class NotificationController extends Controller
{
    //show notification for user
    public function notificationforstatus(){
        $user=Auth::user();
        $user_id=$user->id;
        $acceptedproject=Project::where('user_id',$user_id)->where('status','approved')->select('id','title')->get();
        $rejectedproject=Project::where('user_id',$user_id)->where('status','rejected')->select('id','title')->get();
        return response()->json([
            'acceptedproject' => $acceptedproject,
            'rejectedproject' => $rejectedproject,
    ], 200);
    }
}

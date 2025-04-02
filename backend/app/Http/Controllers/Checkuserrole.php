<?php

namespace App\Http\Controllers;

use App\Models\Admine;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class Checkuserrole extends Controller
{
   // Example method to determine if user is an admin or client
public function checkUserRole($userId)
{
    $admin = Admine::where('user_id', $userId)->first();
    $client = Client::where('user_id', $userId)->first();

    if ($admin) {
        // The user is an admin
        return 'admin';
    } elseif ($client) {
        // The user is a client
        return 'client';
    }

    return 'guest'; 
}

}

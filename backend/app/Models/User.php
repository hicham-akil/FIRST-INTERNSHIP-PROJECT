<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;
    use HasApiTokens;
    protected $fillable = [
        'name', 'email', 'password'
    ];

    public function admin()
    {
        return $this->hasOne(Admine::class);
    }

    public function client()
    {
        return $this->hasOne(Client::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }
   
}

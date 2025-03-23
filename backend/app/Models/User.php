<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'password'];

    public function admin()
    {
        return $this->hasOne(Admine::class);
    }

    public function client()
    {
        return $this->hasOne(Client::class);
    }

        public function isAdmin()
        {
            return $this->admin !== null;
        }

        public function isClient()
        {
            return $this->client !== null;
        }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
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

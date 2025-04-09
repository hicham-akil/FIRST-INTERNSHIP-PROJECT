<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class opinion extends Model
{
    //
    protected $fillable=["user_id","opinion_message"];
    public function user(){
        return $this->belongsTo(User::class);
    }
}

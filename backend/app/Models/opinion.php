<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class opinion extends Model
{
    //
    protected $fillable=["user_id","opinion_message"];
    public function client(){
        return $this->belongsTo(Client::class,'user_id');
    }
}

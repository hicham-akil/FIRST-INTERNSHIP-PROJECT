<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Statistic extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'total_projects', 'accepted_projects', 'rejected_projects', 'pending_projects', 'generated_at'
    ];
}

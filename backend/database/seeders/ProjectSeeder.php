<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        // Creating two projects for users with ID 1 and ID 2
        Project::create([
            'user_id' => 1,
            'title' => 'Web Development Project 1',
            'description' => 'This is the first web development project for user 1.',
            'status' => 'En attente', // or 'Accepté' or 'Refusé'
        ]);

        Project::create([
            'user_id' => 2,
            'title' => 'Mobile App Development Project 2',
            'description' => 'This is the second mobile app development project for user 2.',
            'status' => 'Accepté', // or 'En attente' or 'Refusé'
        ]);
    }
}

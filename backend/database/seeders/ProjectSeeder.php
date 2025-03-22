<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\User;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        Project::truncate(); // Clears table before seeding

        // Get a random user (ensure users exist before seeding projects)
        $user = User::inRandomOrder()->first();

        if (!$user) {
            $this->command->warn('No users found! Run UserSeeder first.');
            return;
        }

        Project::create([
            'user_id' => $user->id,
            'title' => 'Website Development',
            'description' => 'A full-stack web development project.',
            'status' => 'En attente',
            'admin_message' => null
        ]);

        Project::create([
            'user_id' => $user->id,
            'title' => 'Mobile App Design',
            'description' => 'A UI/UX design project for a mobile app.',
            'status' => 'Accepté',
            'admin_message' => 'Your project has been accepted. Proceed with development!'
        ]);

        Project::create([
            'user_id' => $user->id,
            'title' => 'E-commerce Platform',
            'description' => 'A Laravel-based e-commerce system.',
            'status' => 'Refusé',
            'admin_message' => 'Unfortunately, your project was not approved.'
        ]);
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

namespace App\Console\Commands;

use App\Models\Statistic;
use Illuminate\Console\Command;
use App\Models\DailyStatistic;
use App\Models\Project;
use Carbon\Carbon;

class StoreDailyStatistics extends Command {
    protected $signature = 'statistics:store';
    protected $description = 'Store daily statistics for projects';

    public function handle() {
        $total = Project::count();
        $accepted = Project::where('status', 'approved')->count();
        $rejected = Project::where('status', 'rejected')->count();
        $pending = Project::where('status', 'pending')->count();

        Statistic::create([
            'total_projects' => $total,
            'accepted_projects' => $accepted,
            'rejected_projects' => $rejected,
            'pending_projects' => $pending,
            'generated_at' => Carbon::now(),
        ]);

        $this->info('Daily statistics stored successfully!');
    }
}


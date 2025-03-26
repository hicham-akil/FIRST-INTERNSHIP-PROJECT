<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToProjectsTable extends Migration
{
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->enum('priority', ['low', 'medium', 'high'])->nullable()->after('status');
            $table->timestamp('estimated_completion')->nullable()->after('priority');
        });
    }

    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('priority');
            $table->dropColumn('estimated_completion');
        });
    }
}

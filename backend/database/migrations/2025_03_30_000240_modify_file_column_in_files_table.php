<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->string('file')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->string('file')->nullable(false);
        });
    }
    
};

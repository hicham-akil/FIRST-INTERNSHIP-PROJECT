<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToFilesTable extends Migration
{
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->string('file_type')->nullable()->after('file_path');
            $table->timestamp('uploaded_at')->nullable()->after('file_type');
        });
    }

    public function down()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn('file_type');
            $table->dropColumn('uploaded_at');
        });
    }
}

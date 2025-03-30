    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {
        public function up()
        {
            Schema::create('files', function (Blueprint $table) {
                $table->id(); 
                $table->foreignId('project_id')->constrained()->onDelete('cascade'); 
                $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
                $table->string('file')->nullable();
                $table->timestamps(); 
            });
        }

        public function down()
        {
            Schema::dropIfExists('files'); 
        }
    };

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id(); // ID unique de la notification
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID de l'utilisateur concerné
            $table->text('message'); // Contenu de la notification
            $table->boolean('is_read')->default(false); // Statut de lecture (false = non lu, true = lu)
            $table->timestamps(); // Date de création et mise à jour
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications'); // Supprime la table en cas de rollback
    }
};

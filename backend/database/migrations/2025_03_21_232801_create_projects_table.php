<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id(); // ID unique du projet
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID du client qui soumet le projet
            $table->string('title'); // Titre du projet
            $table->text('description'); // Description du projet
            $table->enum('status', ['En attente', 'Accepté', 'Refusé'])->default('En attente'); // Statut du projet
            $table->text('admin_message')->nullable(); // Message de l'admin après décision
            $table->timestamps(); // Date de création et mise à jour
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects'); // Supprime la table en cas de rollback
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // ID unique de l'utilisateur
            $table->string('name'); // Nom de l'utilisateur
            $table->string('email')->unique(); // Email unique pour connexion
            $table->string('password'); // Mot de passe hashé
            $table->enum('role', ['Admin', 'Client'])->default('Client'); // Rôle utilisateur (admin ou client)
            $table->timestamps(); // Date de création et mise à jour
        });
    }

    public function down()
    {
        Schema::dropIfExists('users'); // Supprime la table en cas de rollback
    }
};

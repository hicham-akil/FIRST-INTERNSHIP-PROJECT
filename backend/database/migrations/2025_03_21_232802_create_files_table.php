<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id(); // ID unique du fichier
            $table->foreignId('project_id')->constrained()->onDelete('cascade'); // Projet auquel le fichier est attaché
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Utilisateur qui a uploadé le fichier
            $table->string('file_name'); // Nom original du fichier
            $table->string('file_path'); // Chemin du fichier sur le serveur
            $table->timestamps(); // Date de création et mise à jour
        });
    }

    public function down()
    {
        Schema::dropIfExists('files'); // Supprime la table en cas de rollback
    }
};

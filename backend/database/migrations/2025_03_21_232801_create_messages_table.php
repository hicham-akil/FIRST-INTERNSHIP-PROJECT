<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // ID unique du message
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade'); // Expéditeur du message (admin ou client)
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade'); // Destinataire du message
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('set null'); // Projet concerné (peut être null)
            $table->text('message'); // Contenu du message
            $table->timestamps(); // Date de création et mise à jour
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages'); // Supprime la table en cas de rollback
    }
};

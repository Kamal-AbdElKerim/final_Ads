<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ads', function (Blueprint $table) {
            $table->id();
            $table->string('Title', 255);
            $table->text('Description')->nullable();
            $table->foreignId('CategoryID')->constrained('categories')->onDelete('CASCADE');
            $table->string('Condition', 255);
            $table->string('Puissance', 255)->default(null);
            $table->string('TypeCar', 255)->default(null);
            $table->string('Model', 255)->default(null);
            $table->foreignId('UserID')->constrained('users')->onDelete('CASCADE');
            $table->decimal('Price', 10, 2);
            $table->string('TypePrice', 255);
            $table->string('City', 100);
            $table->string('Location', 400);
            $table->enum('status', ['pending', 'approved', 'rejected', 'sold'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ads');
    }
};

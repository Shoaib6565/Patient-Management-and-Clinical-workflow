<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('firms', function (Blueprint $table) {
            $table->id();

            $table->string('firm_name');

            // ENUM for firm type
            $table->enum('firm_type', [
                'Legal',
                'Corporate',
                'Government',
                'Other'
            ]);

            $table->text('address')->nullable();

            $table->string('phone', 20)->nullable();
            $table->string('contact_person')->nullable();

            $table->boolean('is_active')->default(true);

            // Indexes for fast quires
            $table->index('firm_type');
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('firms');
    }
};

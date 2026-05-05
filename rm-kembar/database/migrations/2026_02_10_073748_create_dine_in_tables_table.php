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
        Schema::create('dine_in_tables', function (Blueprint $table) {
            $table->id();
            $table->string('table_number', 10)->unique();
            $table->integer('capacity');
            $table->string('status', 20)->default('kosong');
            $table->timestamp('locked_at')->nullable();
            $table->unsignedBigInteger('locked_by_order_id')->nullable()->index();
            $table->string('qr_code_path')->nullable();
            $table->string('location_label', 100)->nullable();
            $table->string('notes')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dine_in_tables');
    }
};

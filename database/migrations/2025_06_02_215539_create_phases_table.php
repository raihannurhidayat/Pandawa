<?php

use App\Enums\PhaseStatus;
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
        Schema::create('phases', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuidMorphs('phaseable');
            $table->string('title');
            $table->text('body')->nullable();
            $table->text('reason')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(false);
            $table->timestamp('activated_at')->nullable();
            $table->string('status')->default(PhaseStatus::Pending->value);
            $table->timestamps();

            $table->index(['phaseable_id', 'phaseable_type', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phases');
    }
};

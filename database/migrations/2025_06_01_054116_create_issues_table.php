<?php

use App\IssueStatus;
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
        Schema::create('issues', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('body')->nullable();
            $table->foreignUuid('user_id')->constrained('users');
            $table->foreignUuid('issue_category_id')->constrained('issue_categories');
            $table->json('location');
            $table->string('status')->default(IssueStatus::Open->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('issues');
    }
};

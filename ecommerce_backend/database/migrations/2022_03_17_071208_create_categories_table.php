<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    use SoftDeletes;
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('catName', 50);
            $table->string('slug', 50);
            $table->string('image', 255)->nullable();
            $table->string('icon', 255)->nullable();
            $table->integer('parentId')->unsigned();
            $table->string('description', 200)-> nullable();
            $table->tinyInteger('status')->length(1)->unsigned()->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->tinyInteger('popular')->default(0)->unsigned();
            $table->softDeletes();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};

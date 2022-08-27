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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('productName', 100);
            $table->string('slug', 100);
            $table->bigInteger('catId')->unsigned();
            $table->bigInteger('brandId')->unsigned();
            $table->string('origin')->nullable();
            $table->mediumText('shortDetail')->nullable();
            $table->mediumText('detail');
            $table->integer('ram');
            $table->integer('rom');
            $table->string('chip')->nullable();
            $table->string('screen')->nullable();
            $table->string('graphicsCard')->nullable();
            $table->string('mass')->nullable();
            $table->integer('installment')->default(0);
            $table->integer('price');
            $table->integer('salePrice');
            $table->string('image', 1000);
            $table->mediumText('specifications')->nullable();
            $table->Integer('quantity');
            $table->tinyInteger('popular')->default(0)->unsigned();
            $table->tinyInteger('offersGifts')->nullable();
            $table->tinyInteger('status')->unsigned()->default(1);
            $table->timestamps();
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
        Schema::dropIfExists('products');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('settings')->insert([
            [
                'key' => 'about_us_story',
                'label' => 'Cerita Singkat',
                'value' => 'Didirikan pada tahun 2024, Rumah Makan Kembar menghadirkan cita rasa autentik Nusantara dengan bahan pilihan terbaik. Kami berdedikasi menyajikan pengalaman kuliner yang hangat dan tak terlupakan bagi setiap pelanggan.',
                'type' => 'text',
                'group' => 'TENTANG KAMI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'about_us_vision',
                'label' => 'Visi & Misi',
                'value' => 'Menjadi rumah makan keluarga terfavorit yang melestarikan resep tradisional Indonesia dengan pelayanan modern yang cepat dan higienis.',
                'type' => 'text',
                'group' => 'TENTANG KAMI',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('settings')->whereIn('key', ['about_us_story', 'about_us_vision'])->delete();
    }
};

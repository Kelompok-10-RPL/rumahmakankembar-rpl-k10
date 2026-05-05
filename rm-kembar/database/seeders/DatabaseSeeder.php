<?php

namespace Database\Seeders;

use App\Models\DineInTable;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        collect([
            ['key' => 'tax_rate', 'value' => '0.11', 'type' => 'float', 'label' => 'PPN', 'group' => 'payment'],
            ['key' => 'auto_cancel_minutes', 'value' => '30', 'type' => 'integer', 'label' => 'Auto-cancel reservasi', 'group' => 'reservation'],
            ['key' => 'low_stock_threshold', 'value' => '5', 'type' => 'integer', 'label' => 'Batas stok rendah', 'group' => 'stock'],
            ['key' => 'dp_percentage', 'value' => '0.50', 'type' => 'float', 'label' => 'DP catering', 'group' => 'payment'],
            ['key' => 'delivery_fee_per_km', 'value' => '5000', 'type' => 'integer', 'label' => 'Ongkir per km', 'group' => 'catering'],
        ])->each(fn ($setting) => Setting::updateOrCreate(['key' => $setting['key']], $setting));

        User::updateOrCreate(
            ['email' => 'admin@rmkembar.test'],
            ['name' => 'Admin RM Kembar', 'phone' => '6281111111111', 'role' => 'admin', 'password' => 'password', 'is_active' => true]
        );

        User::updateOrCreate(
            ['email' => 'owner@rmkembar.test'],
            ['name' => 'Owner RM Kembar', 'phone' => '6281222222222', 'role' => 'owner', 'password' => 'password', 'is_active' => true]
        );

        User::updateOrCreate(
            ['email' => 'kitchen@rmkembar.test'],
            ['name' => 'Kitchen RM Kembar', 'phone' => '6281333333333', 'role' => 'kitchen', 'password' => 'password', 'is_active' => true]
        );

        $categories = collect([
            ['name' => 'Ayam', 'slug' => 'ayam', 'sort_order' => 1],
            ['name' => 'Nasi & Lainnya', 'slug' => 'nasi-lainnya', 'sort_order' => 2],
            ['name' => 'Minuman', 'slug' => 'minuman', 'sort_order' => 3],
        ])->mapWithKeys(fn ($category) => [
            $category['slug'] => MenuCategory::updateOrCreate(['slug' => $category['slug']], $category),
        ]);

        collect([
            ['category' => 'ayam', 'name' => 'Ayam Bakar Kembar', 'slug' => 'ayam-bakar-kembar', 'description' => 'Ayam bakar bumbu manis gurih dengan sambal dan lalapan.', 'price' => 28000, 'stock' => 25, 'sort_order' => 1],
            ['category' => 'ayam', 'name' => 'Ayam Goreng Serundeng', 'slug' => 'ayam-goreng-serundeng', 'description' => 'Ayam goreng renyah dengan taburan serundeng.', 'price' => 26000, 'stock' => 20, 'sort_order' => 2],
            ['category' => 'nasi-lainnya', 'name' => 'Nasi Putih', 'slug' => 'nasi-putih', 'description' => 'Nasi putih hangat.', 'price' => 6000, 'stock' => 60, 'sort_order' => 3],
            ['category' => 'nasi-lainnya', 'name' => 'Paket Kembar Hemat', 'slug' => 'paket-kembar-hemat', 'description' => 'Nasi, ayam, tahu tempe, sambal, dan es teh.', 'price' => 36000, 'stock' => 18, 'sort_order' => 4],
            ['category' => 'minuman', 'name' => 'Es Teh Manis', 'slug' => 'es-teh-manis', 'description' => 'Teh manis dingin.', 'price' => 7000, 'stock' => 40, 'sort_order' => 5],
            ['category' => 'minuman', 'name' => 'Es Jeruk', 'slug' => 'es-jeruk', 'description' => 'Jeruk peras segar dengan es.', 'price' => 10000, 'stock' => 30, 'sort_order' => 6],
        ])->each(function ($menu) use ($categories) {
            Menu::updateOrCreate(
                ['slug' => $menu['slug']],
                [
                    'category_id' => $categories[$menu['category']]->id,
                    'name' => $menu['name'],
                    'description' => $menu['description'],
                    'price' => $menu['price'],
                    'stock' => $menu['stock'],
                    'low_stock_threshold' => 5,
                    'is_available' => true,
                    'is_for_dine_in' => true,
                    'is_for_catering' => true,
                    'sort_order' => $menu['sort_order'],
                ]
            );
        });

        foreach (range(1, 10) as $number) {
            DineInTable::updateOrCreate(
                ['table_number' => (string) $number],
                ['capacity' => $number <= 4 ? 4 : 6, 'status' => 'kosong', 'location_label' => $number <= 6 ? 'Indoor' : 'Outdoor']
            );
        }
    }
}

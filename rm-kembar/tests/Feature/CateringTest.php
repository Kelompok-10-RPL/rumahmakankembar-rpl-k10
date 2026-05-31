<?php

namespace Tests\Feature;

use App\Models\Catering;
use App\Models\Menu;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CateringTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_customer_can_create_catering_order_with_valid_data(): void
    {
        $menu = Menu::query()->where('is_for_catering', true)->firstOrFail();
        
        // Ensure tax and dp percentage are set
        Setting::updateOrCreate(['key' => 'tax_rate'], ['value' => '0.11']);
        Setting::updateOrCreate(['key' => 'dp_percentage'], ['value' => '0.5']);

        $response = $this->post(route('catering.store'), [
            'eventName' => 'Pernikahan Budi',
            'date' => now()->addDays(7)->toDateString(),
            'time' => '12:00',
            'place' => 'Gedung Serbaguna',
            'contacts' => [
                [
                    'name' => 'Budi',
                    'phone' => '628155500009',
                    'email' => 'budi.catering@example.test',
                ]
            ],
            'menuItems' => [
                [
                    'id' => $menu->id,
                    'quantity' => 100,
                ]
            ],
            'specialRequest' => 'Dekorasi warna biru',
        ]);

        $response->assertRedirect(route('home'));

        $this->assertDatabaseHas('caterings', [
            'event_date' => now()->addDays(7)->startOfDay()->format('Y-m-d H:i:s'),
            'event_time' => '12:00',
            'delivery_address' => 'Gedung Serbaguna',
            'status' => 'pending',
            'notes' => 'Dekorasi warna biru',
        ]);

        $catering = Catering::latest()->first();
        $this->assertEquals($menu->price * 100, $catering->subtotal);
        $this->assertCount(1, $catering->items);
        $this->assertEquals($menu->id, $catering->items->first()->menu_id);
        $this->assertEquals(100, $catering->items->first()->qty);
        
        // Assert user was created
        $this->assertDatabaseHas('users', [
            'phone' => '628155500009',
            'role' => 'customer',
        ]);
        
        $this->assertEquals('Pernikahan Budi', $catering->meta['event_name']);
        $this->assertEquals('Budi', $catering->meta['contacts'][0]['name']);
    }

    public function test_catering_order_requires_valid_data(): void
    {
        $response = $this->post(route('catering.store'), [
            'eventName' => 'A', // Too short
            // Missing date
            'place' => 'Gedung',
            'contacts' => [], // Empty contacts
            'menuItems' => [
                [
                    'id' => 9999, // Invalid menu
                    'quantity' => 0, // Invalid quantity
                ]
            ],
        ]);

        $response->assertSessionHasErrors([
            'eventName', 
            'date', 
            'contacts',
            'menuItems.0.id',
            'menuItems.0.quantity',
        ]);

        $this->assertDatabaseCount('caterings', 0);
    }
}

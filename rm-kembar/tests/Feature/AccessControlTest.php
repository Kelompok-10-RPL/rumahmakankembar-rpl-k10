<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccessControlTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    public function test_guest_is_redirected_from_authenticated_pages(): void
    {
        $this->get(route('account.history'))->assertRedirect(route('login'));
        $this->get(route('admin.dashboard'))->assertRedirect(route('login'));
        $this->get(route('kitchen.index'))->assertRedirect(route('login'));
    }

    public function test_customer_cannot_access_staff_pages(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628177700001']);

        $this->actingAs($customer)->get(route('admin.dashboard'))->assertForbidden();
        $this->actingAs($customer)->get(route('kitchen.index'))->assertForbidden();
    }

    public function test_kitchen_can_access_kitchen_but_not_admin_dashboard(): void
    {
        $kitchen = User::query()->where('email', 'kitchen@rmkembar.test')->firstOrFail();

        $this->actingAs($kitchen)->get(route('kitchen.index'))->assertOk();
        $this->actingAs($kitchen)->get(route('admin.dashboard'))->assertForbidden();
    }

    public function test_owner_can_access_admin_pages(): void
    {
        $owner = User::query()->where('email', 'owner@rmkembar.test')->firstOrFail();

        $this->actingAs($owner)->get(route('admin.dashboard'))->assertOk();
        $this->actingAs($owner)->get(route('admin.menu.index'))->assertOk();
        $this->actingAs($owner)->get(route('admin.tables.index'))->assertOk();
    }

    public function test_inactive_user_cannot_login(): void
    {
        User::factory()->create([
            'name' => 'Inactive Staff',
            'email' => 'inactive@example.test',
            'phone' => '628177700002',
            'role' => 'admin',
            'password' => 'password',
            'is_active' => false,
        ]);

        $this->post(route('login.store'), [
            'email' => 'inactive@example.test',
            'password' => 'password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_login_rejects_wrong_password(): void
    {
        $this->from(route('login'))->post(route('login.store'), [
            'email' => 'admin@rmkembar.test',
            'password' => 'salah123',
        ])
            ->assertRedirect(route('login'))
            ->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_login_redirects_staff_to_their_dashboard(): void
    {
        $this->post(route('login.store'), [
            'email' => 'admin@rmkembar.test',
            'password' => 'password',
        ])->assertRedirect(route('admin.dashboard'));

        auth()->logout();

        $this->post(route('login.store'), [
            'email' => 'kitchen@rmkembar.test',
            'password' => 'password',
        ])->assertRedirect(route('kitchen.index'));
    }

    public function test_authenticated_user_can_logout(): void
    {
        $admin = User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();

        $this->actingAs($admin)
            ->post(route('logout'))
            ->assertRedirect(route('home'));

        $this->assertGuest();
    }

    public function test_guest_cannot_logout_as_active_user(): void
    {
        $this->post(route('logout'))->assertRedirect(route('login'));
    }
}

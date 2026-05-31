<?php

namespace Tests\Feature;

use App\Exports\SalesExport;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Maatwebsite\Excel\Facades\Excel;
use Tests\TestCase;

class ReportExportTest extends TestCase
{
    use RefreshDatabase;

    protected bool $seed = true;

    private function getAdmin(): User
    {
        return User::query()->where('email', 'admin@rmkembar.test')->firstOrFail();
    }

    private function createPaidOrder()
    {
        $customer = User::factory()->create(['role' => 'customer', 'phone' => '628155500010']);
        return Order::create([
            'unique_code' => Order::generateCode($customer),
            'user_id' => $customer->id,
            'order_type' => 'dine_in',
            'subtotal' => 10000,
            'tax_rate' => 0.11,
            'tax_amount' => 1100,
            'total_price' => 11100,
            'payment_status' => 'paid',
            'status' => 'completed',
        ]);
    }

    public function test_admin_can_export_csv_report(): void
    {
        $this->createPaidOrder();
        
        $admin = $this->getAdmin();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', ['type' => 'csv']));
        
        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('Kode,Tanggal,Customer,Meja,Status,Pembayaran,Subtotal,PPN,Total', $content);
        $this->assertStringContainsString('11100', $content); // Assert total price is in CSV
    }

    public function test_admin_can_export_excel_report(): void
    {
        $this->createPaidOrder();
        
        Excel::fake();
        
        $admin = $this->getAdmin();

        $from = now()->startOfMonth();
        $to = now()->endOfDay();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', ['type' => 'excel']));
        
        $response->assertOk();
        
        Excel::assertDownloaded("laporan-rm-kembar-{$from->toDateString()}-{$to->toDateString()}.xlsx", function (SalesExport $export) {
            return true;
        });
    }

    public function test_admin_can_export_pdf_report(): void
    {
        $this->createPaidOrder();
        
        $admin = $this->getAdmin();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', ['type' => 'pdf']));
        
        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/pdf');
    }

    public function test_export_redirects_back_with_error_if_no_data(): void
    {
        // No orders created, should fail because orders is empty (for the given date range)
        $admin = $this->getAdmin();

        $response = $this->actingAs($admin)->get(route('admin.reports.export', [
            'from' => now()->addDays(10)->toDateString(),
            'to' => now()->addDays(11)->toDateString(),
        ]));
        
        $response->assertRedirect();
        $response->assertSessionHasErrors(['report' => 'Data tidak tersedia.']);
    }
}

<?php

namespace Tests\Feature;

use App\Services\WhatsAppService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class WhatsAppServiceTest extends TestCase
{
    public function test_whatsapp_service_sends_message_successfully(): void
    {
        Http::fake([
            config('services.evolution.url') . '/*' => Http::response(['status' => 'success'], 200),
        ]);

        $result = WhatsAppService::sendMessage('08155500008', 'Hello from test');
        
        $this->assertTrue($result);
        
        Http::assertSent(function ($request) {
            return $request->hasHeader('apikey', config('services.evolution.key')) &&
                   $request['number'] === '628155500008' &&
                   $request['text'] === 'Hello from test';
        });
    }

    public function test_whatsapp_service_handles_api_errors_gracefully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Internal error'], 500),
        ]);

        $result = WhatsAppService::sendMessage('08155500008', 'Hello from test');
        
        $this->assertFalse($result);
    }
    
    public function test_whatsapp_service_cleans_phone_number_formats(): void
    {
        Http::fake([
            config('services.evolution.url') . '/*' => Http::response(['status' => 'success'], 200),
        ]);

        // With +, spaces, dashes, etc
        $result = WhatsAppService::sendMessage('+62 815-5500-008', 'Hello from test');
        
        $this->assertTrue($result);
        
        Http::assertSent(function ($request) {
            return $request['number'] === '628155500008'; // Cleaned number
        });
    }
}

<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public static function sendMessage(string $phone, string $message): bool
    {
        $url = env('EVOLUTION_API_URL') . '/message/sendText/' . env('EVOLUTION_INSTANCE_NAME');
        $apiKey = env('EVOLUTION_API_KEY');

        // Format phone number to international format (example for ID)
        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        }

        try {
            $response = Http::timeout(5)->withHeaders([
                'apikey' => $apiKey,
                'Content-Type' => 'application/json',
            ])->post($url, [
                'number' => $phone,
                'text' => $message,
                'delay' => 1200,
            ]);

            if ($response->successful()) {
                return true;
            }

            Log::error('WhatsApp API Error: ' . $response->body());
            return false;
        } catch (\Exception $e) {
            Log::error('WhatsApp Exception: ' . $e->getMessage());
            return false;
        }
    }
}

<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    public static function sendMessage(string $phone, string $message): bool
    {
        $url = config('services.evolution.url') . '/message/sendText/' . config('services.evolution.instance');
        $apiKey = config('services.evolution.key');

        // Clean phone number (remove +, spaces, dashes, parentheses)
        $phone = preg_replace('/[^0-9]/', '', $phone);
        
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

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings', [
            'settings' => Setting::query()
                ->orderBy('group')
                ->orderBy('label')
                ->get()
                ->groupBy('group')
                ->toArray(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $values = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*' => ['nullable', 'string'],
        ])['settings'];

        $settings = Setting::query()->whereIn('key', array_keys($values))->get();

        foreach ($settings as $setting) {
            $value = $values[$setting->key] ?? null;
            $this->validateValue($setting, $value);
            $setting->update(['value' => (string) $value]);
        }

        return back()->with('status', 'Pengaturan diperbarui.');
    }

    private function validateValue(Setting $setting, mixed $value): void
    {
        $isValid = match ($setting->type) {
            'integer' => filter_var($value, FILTER_VALIDATE_INT) !== false,
            'float' => filter_var($value, FILTER_VALIDATE_FLOAT) !== false,
            'boolean' => in_array($value, ['0', '1', 'true', 'false'], true),
            'text' => true,
            default => filled($value),
        };

        if ($isValid && in_array($setting->type, ['integer', 'float'], true) && (float) $value < 0) {
            $isValid = false;
        }

        if (! $isValid) {
            throw ValidationException::withMessages([
                "settings.{$setting->key}" => "{$setting->label} tidak valid.",
            ]);
        }
    }
}

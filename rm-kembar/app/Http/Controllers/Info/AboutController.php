<?php

namespace App\Http\Controllers\Info;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Info/AboutUs', [
            'story' => \App\Models\Setting::valueFor('about_us_story', 'Rumah Makan Kembar menghadirkan cita rasa autentik Nusantara...'),
            'vision' => \App\Models\Setting::valueFor('about_us_vision', 'Melestarikan resep tradisional dengan pelayanan cepat...'),
        ]);
    }
}
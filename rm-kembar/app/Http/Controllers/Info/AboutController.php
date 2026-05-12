<?php

namespace App\Http\Controllers\Info;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Info/AboutUs');
    }
}
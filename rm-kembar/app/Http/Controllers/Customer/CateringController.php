<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CateringController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Catering/Catering');
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IssueController extends Controller
{
    public function index()
    {
        return Inertia::render('issue/index');
    }

    public function create()
    {
        return Inertia::render('issue/create');
    }

    public function store()
    {
        //
    }

    public function show()
    {
        //
    }

    public function edit()
    {
        //
    }

    public function update()
    {
        //
    }

    public function destroy()
    {
        //
    }
}

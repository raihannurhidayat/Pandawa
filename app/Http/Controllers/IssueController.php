<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Issue;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    public function index(Request $request)
    {
        $query = Issue::query()->with('user', 'issueCategory');

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('status')) {
            $query->status($request->status);
        }

        $issues = $query->get();

        return Inertia::render('issue/index', [
            'issues' => $issues
        ]);
    }

    public function create()
    {
        return Inertia::render('issue/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'category' => 'required',
            'body' => 'string|nullable',
            'issue_category_id' => 'required',
            'location' => 'required',
        ]);

        Issue::create($validated);
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

    public function destroy(Issue $issue)
    {
        $issue->archive();
    }
}

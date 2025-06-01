<?php

namespace App\Http\Controllers;

use App\IssueStatus;
use Inertia\Inertia;
use App\Models\Issue;
use Illuminate\Http\Request;
use App\Models\IssueCategory;
use Illuminate\Support\Facades\Auth;

class IssueController extends Controller
{
    public function index(Request $request)
    {
        $query = Issue::query()->with(['user', 'issueCategory', 'attachments']);

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }
        if ($request->has('category')) {
            $query->whereHas('issueCategory', function ($query) use ($request) {
                $query->whereIn('slug', explode(',', $request->category));
            });
        }

        if ($request->has('status')) {
            $query->whereIn('status', explode(',', $request->status));
        }

        $categories = IssueCategory::all();
        $status = IssueStatus::cases();
        $issues = $query->get();

        return Inertia::render('issue/index', [
            'categories' => $categories,
            'status' => $status,
            'issues' => $issues,
        ]);
    }

    public function create()
    {
        $categories = IssueCategory::all();

        // dd($categories);

        return Inertia::render('issue/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([
            'title' => 'required',
            'body' => 'string|nullable',
            'issue_category_id' => 'required',
            'location' => 'string|nullable',
            'attachments' => 'array|nullable',
        ]);

        $validated['user_id'] = Auth::user()->id;
        $validated['location'] = json_encode([
            'province' => 12,
            'city' => 1202,
            "district" => 120202,
            "village" => 1202021
        ]);

        // dd($validated);

        $issue = Issue::create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $issue->addAttachment($file);
            }
        }

        return redirect()->route('pengaduan.index');
    }

    public function show(Issue $issue)
    {
        $issue->load('user', 'issueCategory', 'attachments');

        return Inertia::render('issue/show', [
            'issue' => $issue
        ]);
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

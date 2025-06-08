<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\IssueCategory;
use App\Models\Issue;
use App\Enums\PhaseStatus;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('user/user-dashboard');
    }

    public function pengaduan(Request $request)
    {
        $query = Issue::query()->with(['user', 'issueCategory', 'attachments'])->orderBy('updated_at', 'desc');

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
        $status = PhaseStatus::cases();
        $issues = $query->get();

        return Inertia::render('user/pengaduan/index', [
            'categories' => $categories,
            'status' => $status,
            'issues' => $issues,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = IssueCategory::all();

        return Inertia::render('user/pengaduan/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'body' => 'string|nullable',
            'issue_category_id' => 'required',
            'location' => 'string|nullable',
            'attachments' => 'array|nullable',
        ]);

        $validated['user_id'] = Auth::user()->id;
        // $validated['location'] = json_encode([
        //     'province' => 12,
        //     'city' => 1202,
        //     "district" => 120202,
        //     "village" => 1202021
        // ]);

        $issue = Issue::create($validated);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $issue->addAttachment($file);
            }
        }

        return redirect()->route('user.pengaduan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

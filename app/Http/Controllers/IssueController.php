<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Enums\PhaseStatus;
use App\IssueProgressTemplates;
use App\Models\Issue;
use App\Models\IssueCategory;
use App\Models\Phase;
use Illuminate\Support\Facades\Auth;

class IssueController extends Controller
{
    public function index(Request $request)
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

        return Inertia::render('issue/index', [
            'categories' => $categories,
            'status' => $status,
            'issues' => $issues,
        ]);
    }

    public function create()
    {
        $categories = IssueCategory::all();

        return Inertia::render('issue/create', [
            'categories' => $categories,
        ]);
    }

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

        return redirect()->route('pengaduan.index');
    }

    public function show($pengaduan)
    {
        $issue = Issue::findOrFail($pengaduan)->load('user', 'issueCategory', 'phases', 'phases.attachments', 'attachments');

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

    public function updatePhase(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required',
            'reason' => 'string',
            'attachments' => 'array|nullable',
        ]);

        $phase = Phase::findOrFail($id);

        $status = $validated['status'];
        $order = $phase->order;

        // Retrieve template based on phase order and status
        $template = IssueProgressTemplates::ISSUE_PROGRESS_TEMPLATES[$order][$status] ?? null;

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $phase->addAttachment($file);
            }
        }

        // Update the phase with template values
        $phase->update([
            'title' => $template['title'],
            'body' => $template['body'],
            'status' => $template['status'],
            'reason' => $validated['reason'] ?? null,
        ]);
    }
}

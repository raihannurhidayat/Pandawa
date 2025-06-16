<?php

namespace App\Http\Controllers;

use App\Enums\PhaseStatus;
use App\Models\Issue;
use App\Models\IssueCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $query = Issue::query()->with(['user', 'issueCategory', 'attachments'])->where("user_id", "=", Auth::id())->orderBy('updated_at', 'desc');

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
        $status     = PhaseStatus::cases();
        $issues     = $query->get();

        return Inertia::render('user/pengaduan/index', [
            'categories' => $categories,
            'status'     => $status,
            'issues'     => $issues,
        ]);
    }

    public function pengaduanWarga(Request $request)
    {

        $query = Issue::query()
            ->withCount('likes')
            ->with([
                'likes' => function ($q) {
                    $q->where('user_id', Auth::id());
                },
                'user',
                'issueCategory',
                'attachments',
            ])
            ->orderBy('updated_at', 'desc');

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
        $status     = PhaseStatus::cases();
        $issues     = $query->get();

        return Inertia::render('user/pengaduan-warga', [
            'categories' => $categories,
            'status'     => $status,
            'issues'     => $issues,
        ]);
    }

    public function detailPengaduanWarga(Request $request, string $issueId)
    {
        $issue = Issue::withCount('likes')
            ->with([
                'likes' => function ($q) {
                    $q->where('user_id', Auth::id());
                },
                'user',
                'issueCategory',
                'comments',
                'phases',
                'attachments',
                'phases.attachments'
            ])
            ->findOrFail($issueId);

        return Inertia::render("user/detail-pengaduan-warga", [
            "issue" => $issue,
            'comments' => $issue->comments
        ]);
    }

    public function toggle(Request $request, Issue $issue)
    {
        $user = $request->user();

        if ($issue->isLikedBy($user)) {
            $issue->likes()->where('user_id', $user->id)->delete();
        } else {
            $issue->likes()->create(['user_id' => $user->id]);
        }

        return redirect()->back();
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
            'title'             => 'required',
            'body'              => 'string|nullable',
            'issue_category_id' => 'required',
            'location'          => 'string|nullable',
            'attachments'       => 'array|nullable',
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

<?php

namespace App\Http\Controllers;

use App\Enums\PhaseStatus;
use Inertia\Inertia;
use App\Models\Issue;
use Illuminate\Http\Request;
use App\Models\IssueCategory;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

class LandingController extends Controller
{
    /**
     * Display the landing page with issue status statistics
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        try {
            $statisticsData = $this->getIssueStatisticsData();

            return Inertia::render('welcome', [
                'issuesByStatus' => $statisticsData['issuesByStatus'],
                'issueStatistics' => $statisticsData['totals'],
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to load landing page: ' . $e->getMessage());

            return Inertia::render('welcome', [
                'issuesByStatus' => collect(),
                'issueStatistics' => ['total' => 0, 'active' => 0, 'resolved' => 0],
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
                'error' => 'Gagal memuat statistik. Silakan coba lagi nanti.'
            ]);
        }
    }

    /**
     * Display all issues for public viewing
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function issues(Request $request)
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

        return Inertia::render('issues', [
            'categories' => $categories,
            'status' => $status,
            'issues' => $issues,
        ]);
    }

    /**
     * Display the specified issue (public)
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function showIssue($pengaduan)
    {
        $issue = Issue::findOrFail($pengaduan)->load('user', 'issueCategory', 'phases', 'phases.attachments', 'attachments');

        return Inertia::render('showIssue', [
            'issue' => $issue
        ]);
    }

    /**
     * Get detailed issue statistics (API endpoint)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getIssueStatistics()
    {
        try {
            $statisticsData = $this->getIssueStatisticsData(true);
            return response()->json($statisticsData);
        } catch (\Exception $e) {
            Log::error('Failed to fetch statistics: ' . $e->getMessage());
            return response()->json(['error' => 'Gagal memuat statistik'], 500);
        }
    }

    /**
     * Get issue statistics data with optional caching
     *
     * @param bool $includeAnalytics
     * @return array
     */
    private function getIssueStatisticsData($includeAnalytics = false)
    {
        $cacheKey = 'issue_statistics' . ($includeAnalytics ? '_detailed' : '');

        return Cache::remember($cacheKey, 300, function () use ($includeAnalytics) {
            try {
                $allStatuses = collect(PhaseStatus::cases())->mapWithKeys(function ($status) {
                    return [$status->value => 0];
                });

                $issuesByStatus = Issue::select('status', DB::raw('count(*) as count'))
                    ->groupBy('status')
                    ->get()
                    ->mapWithKeys(function ($item) {
                        return [$item->status->value => $item->count];
                    });

                $completeIssuesByStatus = $allStatuses->merge($issuesByStatus);

                $totalIssues = $completeIssuesByStatus->sum();
                $activeIssues = $this->calculateActiveIssues($completeIssuesByStatus);
                $resolvedIssues = $this->calculateResolvedIssues($completeIssuesByStatus);

                $result = [
                    'issuesByStatus' => $completeIssuesByStatus,
                    'totals' => [
                        'total' => $totalIssues,
                        'active' => $activeIssues,
                        'resolved' => $resolvedIssues,
                    ],
                ];

                if ($includeAnalytics) {
                    $result = array_merge($result, [
                        'percentages' => $completeIssuesByStatus->map(function ($count) use ($totalIssues) {
                            return $totalIssues > 0 ? round(($count / $totalIssues) * 100, 1) : 0;
                        }),
                        'recent_30_days' => $this->getRecentIssuesData($allStatuses),
                        'resolution_rate' => $totalIssues > 0 ? round(($resolvedIssues / $totalIssues) * 100, 1) : 0,
                    ]);
                }

                return $result;
            } catch (\Exception $e) {
                Log::error('Failed to calculate statistics: ' . $e->getMessage());

                return [
                    'issuesByStatus' => collect(),
                    'totals' => ['total' => 0, 'active' => 0, 'resolved' => 0],
                ];
            }
        });
    }

    /**
     * Calculate active issues based on status
     *
     * @param \Illuminate\Support\Collection $issuesByStatus
     * @return int
     */
    private function calculateActiveIssues($issuesByStatus)
    {
        $activeStatuses = ['open', 'pending', 'in_progress'];

        return collect($activeStatuses)->sum(function ($status) use ($issuesByStatus) {
            return $issuesByStatus[$status] ?? 0;
        });
    }

    /**
     * Calculate resolved issues based on status
     *
     * @param \Illuminate\Support\Collection $issuesByStatus
     * @return int
     */
    private function calculateResolvedIssues($issuesByStatus)
    {
        $resolvedStatuses = ['resolved', 'closed', 'completed'];

        return collect($resolvedStatuses)->sum(function ($status) use ($issuesByStatus) {
            return $issuesByStatus[$status] ?? 0;
        });
    }

    /**
     * Get recent issues data (last 30 days)
     *
     * @param \Illuminate\Support\Collection $allStatuses
     * @return \Illuminate\Support\Collection
     */
    private function getRecentIssuesData($allStatuses)
    {
        $recentIssues = Issue::where('created_at', '>=', now()->subDays(30))
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->status->value => $item->count];
            });

        return $allStatuses->merge($recentIssues);
    }
}

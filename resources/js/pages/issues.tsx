import { Head, Link, router } from "@inertiajs/react";
import { Category } from '@/types/category';
import { Issue } from '@/types/issue';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, List, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface IssuesProps {
    categories: Category[];
    status: string[];
    issues: Issue[];
}

export default function Issues({ categories, status, issues }: IssuesProps) {
    console.log('Issues component rendered with issues:', issues);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const issuesPerPage = 6; // Changed to 6 for better grid layout

    // Filter issues based on selected category and status
    const filteredIssues = issues.filter(issue => {
        const categoryMatch = selectedCategory === 'all' || issue.issue_category_id === selectedCategory;
        const statusMatch = selectedStatus === 'all' || issue.status === selectedStatus;
        return categoryMatch && statusMatch;
    });

    // Pagination logic
    const indexOfLastIssue = currentPage * issuesPerPage;
    const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
    const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);
    const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

    // Change status handler using Inertia's router
    const handleStatusChange = (issueId: string, newStatus: string) => {
        router.patch(`/issues/${issueId}`, {
            status: newStatus
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: Show success message
            }
        });
    };

    // Get first attachment as cover image
    const getCoverImage = (issue: Issue) => {
        if (issue.attachments && issue.attachments.length > 0) {
            return issue.attachments[0].url;
        }
        return null;
    };

    return (
        <>
            <Head title="Issues" />

            <Navbar />

            <div className="min-h-screen p-12 font-poppins bg-slate-50 relative overflow-visible">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-40 left-32 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 py-8 relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                        Daftar <span className="text-green-500">Laporan</span>
                    </h1>

                    {/* Filter controls */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-full md:w-1/2">
                            <label htmlFor="category-filter" className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter by Category
                            </label>
                            <select
                                id="category-filter"
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full md:w-1/2">
                            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <List className="w-4 h-4 mr-2" />
                                Filter by Status
                            </label>
                            <select
                                id="status-filter"
                                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">All Statuses</option>
                                {status.map(statusItem => (
                                    <option key={statusItem} value={statusItem}>
                                        {statusItem.charAt(0).toUpperCase() + statusItem.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Issues grid */}
                    <div className="mb-8">
                        {currentIssues.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentIssues.map((issue) => {
                                    const category = categories.find(cat => cat.id === issue.issue_category_id);
                                    const coverImage = getCoverImage(issue);

                                    return (
                                        <div key={issue.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
                                            {/* Cover Image */}
                                            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                                                {coverImage ? (
                                                    <img
                                                        src={coverImage}
                                                        alt={issue.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-gray-400">
                                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Status badge overlay */}
                                                <div className="absolute top-3 right-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${issue.status === 'open' ? 'bg-blue-100/90 text-blue-800' :
                                                            issue.status === 'pending' ? 'bg-yellow-100/90 text-yellow-800' :
                                                                issue.status === 'resolved' ? 'bg-green-100/90 text-green-800' :
                                                                    'bg-gray-100/90 text-gray-800'
                                                        }`}>
                                                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Card Content */}
                                            <div className="p-6">
                                                <Link href={`/issues/${issue.id}`} className="group">
                                                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-3 line-clamp-2">
                                                        {issue.title}
                                                    </h2>
                                                </Link>

                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{issue.body}</p>

                                                <div className="flex flex-col gap-2 text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                                                        </svg>
                                                        {category?.name || 'Unknown Category'}
                                                    </span>

                                                    <span className="flex items-center">
                                                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {issue.created_at_formatted}
                                                    </span>
                                                </div>

                                                {/* Attachment count indicator */}
                                                {issue.attachments && issue.attachments.length > 1 && (
                                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                                        <span className="text-xs text-gray-500 flex items-center">
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                            </svg>
                                                            {issue.attachments.length} attachment{issue.attachments.length > 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">No issues found matching your filters.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mb-8">
                            <nav className="inline-flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${currentPage === index + 1
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                            } border border-gray-200`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
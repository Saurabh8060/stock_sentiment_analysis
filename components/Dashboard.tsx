"use client";

import {useState, useEffect} from "react";
import {fetchDashboard, requestEmailReport} from "@/services/api";
import type {DashboardData} from "@/types/dashboard";
import KPICards from "./KPICards";
import SentimentPie from "./SentimentPie";
import TrendLineChart from "./TrendLineChart";
import NewsTable from "./NewsTable";

export default function Dashboard() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [keyword, setKeyword] = useState("AAPL");
    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [emailStatus, setEmailStatus] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);

    useEffect(() => {
        loadDashboard(keyword);
    }, []);

    const loadDashboard = (term: string) => {
        setLoading(true);
        setError(null);
        setIsSearching(true);
        fetchDashboard(term)
            .then(setData)
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Failed to load dashboard");
            })
            .finally(() => {
                setLoading(false);
                setIsSearching(false);
            });
    };

    const submitSearch = () => {
        if (!keyword.trim()) {
            setError("Enter a stock keyword.");
            return;
        }
        loadDashboard(keyword.trim());
    };

    const submitEmailRequest = async () => {
        setEmailStatus(null);
        if (!keyword.trim() || !email.trim() || !startDate || !endDate) {
            setEmailStatus("Please fill keyword, email, start date, and end date.");
            return;
        }
        setIsEmailSending(true);
        try {
            await requestEmailReport({
                keyword: keyword.trim(),
                start_date: startDate,
                end_date: endDate,
                email: email.trim(),
                max_records: 1000,
            });
            setEmailStatus("✓ Queued successfully! We'll email you when the report is ready.");
        } catch (err) {
            setEmailStatus("✗ " + (err instanceof Error ? err.message : "Failed to queue email request."));
        } finally {
            setIsEmailSending(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-900 mb-4"></div>
                    <p className="text-slate-600 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md border border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <p className="text-red-600 text-center font-semibold">{error ?? "Dashboard unavailable"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-white/95 via-white/90 to-blue-50/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl mb-8 transition-all duration-300 hover:shadow-3xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10"></div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="space-y-3">
                            <h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight"
                                style={{fontFamily: "var(--font-fraunces), serif"}}
                            >
                                Stock Sentiment Dashboard
                            </h1>
                            <p className="text-slate-600 font-medium flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Last updated: {data.updated_at}
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs uppercase tracking-[0.2em] font-semibold">Last 3 Days</span>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 bg-white/90 backdrop-blur rounded-3xl p-6 border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-2 mb-4">
                                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h2 className="text-sm uppercase tracking-[0.2em] text-slate-600 font-semibold">Search Keyword</h2>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className="border-2 border-slate-200 rounded-2xl p-4 flex-1 bg-white focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all outline-none font-medium"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="e.g. AAPL or Apple stock"
                                    onKeyPress={(e) => e.key === 'Enter' && submitSearch()}
                                />
                                <button 
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2" 
                                    onClick={submitSearch}
                                    disabled={isSearching}
                                >
                                    {isSearching ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Searching
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Search
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Dashboard uses a fixed short range for fast insights
                            </p>
                        </div>
                        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">Active Keyword</p>
                                <p className="text-3xl font-bold mb-4 truncate">{keyword}</p>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-sm font-medium">Latest 100 articles</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="mb-8 transition-all duration-300 hover:scale-[1.01]">
                    <KPICards data={data.kpis} />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="transition-all duration-300 hover:scale-[1.02]">
                        <SentimentPie data={data.sentimentDistribution} />
                    </div>
                    <div className="transition-all duration-300 hover:scale-[1.02]">
                        <TrendLineChart data={data.trend} />
                    </div>
                </div>

                {/* News Table */}
                <div className="mb-8 transition-all duration-300">
                    <NewsTable data={data.articles} />
                </div>
            </div>
        </div>
    );
}

import type {ArticleRow} from "@/types/dashboard";

type StockTableProps = {
    data: ArticleRow[];
};

export default function StockTable({data}: StockTableProps) {
    return (
        <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
                    <p className="mt-1 text-sm text-slate-500">{data.length} articles</p>
                </div>
                <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-200">
                            <th className="p-4 text-left text-xs font-bold uppercase tracking-widest text-slate-500">Title</th>
                            <th className="p-4 text-left text-xs font-bold uppercase tracking-widest text-slate-500">Source</th>
                            <th className="p-4 text-left text-xs font-bold uppercase tracking-widest text-slate-500">Sentiment</th>
                            <th className="p-4 text-left text-xs font-bold uppercase tracking-widest text-slate-500">Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((s) => (
                            <tr key={s.url || s.title} className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 font-bold text-white shadow-md">
                                            {s.title.charAt(0)}
                                        </div>
                                        <a className="text-lg font-bold text-slate-900 hover:underline" href={s.url} target="_blank" rel="noreferrer">
                                            {s.title}
                                        </a>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600">{s.source || "Unknown"}</td>
                                <td className="p-4">
                                    <SentimentBadge sentiment={s.sentiment} />
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700">
                                        {s.confidence.toFixed(2)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SentimentBadge({sentiment}: {sentiment: string}) {
    const styles = {
        Positive: "bg-emerald-100 text-emerald-700 border-emerald-200",
        Negative: "bg-rose-100 text-rose-700 border-rose-200",
        Neutral: "bg-amber-100 text-amber-700 border-amber-200",
    };
    
    const icons = {
        Positive: "📈",
        Negative: "📉",
        Neutral: "➖",
    };
    
    const style = styles[sentiment as keyof typeof styles] || "bg-slate-100 text-slate-700 border-slate-200";
    const icon = icons[sentiment as keyof typeof icons] || "•";
    
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>
            {icon} {sentiment}
        </span>
    );
}

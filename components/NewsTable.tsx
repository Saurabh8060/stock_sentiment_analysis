import type {ArticleRow} from "@/types/dashboard";

type NewsTableProps = {
    data: ArticleRow[];
};

export default function NewsTable({data}: NewsTableProps) {
    return (
        <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Latest News</h2>
                <span className="rounded-full bg-slate-900/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-600">
                    {data.length} Articles
                </span>
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
                        {data.map((item, idx) => (
                            <tr key={idx} className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50">
                                <td className="p-4">
                                    <a 
                                        className="font-medium text-slate-900 transition-colors hover:text-blue-600" 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                        {item.source || "Unknown"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <SentimentBadge sentiment={item.sentiment} />
                                </td>
                                <td className="p-4">
                                    <ConfidenceBadge confidence={item.confidence} />
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
    
    const style = styles[sentiment as keyof typeof styles] || "bg-slate-100 text-slate-700 border-slate-200";
    
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>
            {sentiment === "Positive" && "📈"}
            {sentiment === "Negative" && "📉"}
            {sentiment === "Neutral" && "➖"}
            {sentiment}
        </span>
    );
}

function ConfidenceBadge({confidence}: {confidence: number}) {
    const percentage = (confidence * 100).toFixed(0);
    const level = confidence >= 0.7 ? "high" : confidence >= 0.4 ? "medium" : "low";
    
    const styles = {
        high: "bg-blue-100 text-blue-700 border-blue-200",
        medium: "bg-purple-100 text-purple-700 border-purple-200",
        low: "bg-slate-100 text-slate-700 border-slate-200",
    };
    
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[level]}`}>
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
            {percentage}%
        </span>
    );
}
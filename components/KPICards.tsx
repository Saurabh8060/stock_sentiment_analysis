import type {KPIData} from "@/types/dashboard";

type KPICardsProps = {
    data: KPIData;
};

export default function KPICards({data}: KPICardsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card title="Articles" value={data.totalArticles} tone="ink" icon="📊" />
            <Card title="Bullish" value={data.bullish} tone="green" icon="📈" />
            <Card title="Bearish" value={data.bearish} tone="red" icon="📉" />
            <Card title="Neutral" value={data.neutral} tone="gold" icon="➖" />
        </div>
    );
}

type CardProps = {
    title: string;
    value: number;
    tone: "ink" | "green" | "red" | "gold";
    icon: string;
};

const TONES: Record<Exclude<CardProps["tone"], "icon">, {bg: string; text: string; accent: string}> = {
    ink: {bg: "from-slate-900/10 to-slate-900/0", text: "text-slate-900", accent: "bg-slate-900"},
    green: {bg: "from-emerald-500/20 to-emerald-500/0", text: "text-emerald-700", accent: "bg-emerald-500"},
    red: {bg: "from-rose-500/20 to-rose-500/0", text: "text-rose-700", accent: "bg-rose-500"},
    gold: {bg: "from-amber-400/25 to-amber-400/0", text: "text-amber-700", accent: "bg-amber-400"},
};

function Card({title, value, tone, icon}: CardProps) {
    const style = TONES[tone];
    
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${style.bg} transition-opacity duration-300 group-hover:opacity-75`} />
            <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${style.accent} opacity-10 blur-2xl transition-all duration-300 group-hover:scale-150`} />
            
            <div className="relative flex items-start justify-between">
                <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">{title}</p>
                    <p className={`text-4xl font-bold ${style.text} transition-all duration-300 group-hover:scale-110`}>
                        {value.toLocaleString()}
                    </p>
                </div>
                <div className="text-3xl opacity-40 transition-all duration-300 group-hover:scale-125 group-hover:opacity-60">
                    {icon}
                </div>
            </div>
        </div>
    );
}
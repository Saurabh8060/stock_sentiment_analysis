import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";
import type {SentimentDistribution} from "@/types/dashboard";

const COLORS = {
    Positive: "#10b981",
    Neutral: "#f59e0b",
    Negative: "#ef4444"
};

type SentimentPieProps = {
    data: SentimentDistribution;
};

export default function SentimentPie({data}: SentimentPieProps) {
    const chartData = [
        {name: "Positive", value: data.positive, color: COLORS.Positive, icon: "📈"},
        {name: "Neutral", value: data.neutral, color: COLORS.Neutral, icon: "➖"},
        {name: "Negative", value: data.negative, color: COLORS.Negative, icon: "📉"}
    ];

    const total = data.positive + data.neutral + data.negative;

    return (
        <div className="relative flex h-[360px] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl backdrop-blur">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10 blur-3xl" />
            
            <div className="relative mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Sentiment Distribution</h2>
                    <p className="mt-1 text-sm text-slate-500">{total.toLocaleString()} total articles analyzed</p>
                </div>
                <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
            </div>

            <div className="relative flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={chartData} 
                            dataKey="value" 
                            cx="50%" 
                            cy="45%" 
                            outerRadius={52}
                            innerRadius={34}
                            paddingAngle={2}
                            label={(entry) => {
                                const percent = (entry.value / total) * 100;
                                return `${percent.toFixed(0)}%`;
                            }}
                        >
                            {chartData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} stroke="#fff" strokeWidth={2} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            <div className="pt-1">
                <CustomLegend data={chartData} total={total} />
            </div>
        </div>
    );
}

function CustomTooltip({active, payload}: any) {
    if (!active || !payload?.[0]) return null;
    
    const data = payload[0].payload;
    
    return (
        <div className="rounded-xl border border-white bg-white/95 p-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{backgroundColor: data.color}} />
                <span className="font-semibold text-slate-900">{data.name}</span>
                <span className="text-xl">{data.icon}</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-slate-900">{data.value.toLocaleString()}</p>
            <p className="text-xs text-slate-500">articles</p>
        </div>
    );
}

function CustomLegend({data, total}: {data: any[]; total: number}) {
    return (
        <div className="grid grid-cols-3 gap-1 text-[10px]">
            {data.map((item, idx) => {
                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0";
                return (
                    <div key={idx} className="rounded-md border border-slate-200 bg-slate-50/50 p-1.5">
                        <div className="mb-0.5 flex items-center justify-between">
                            <span className="text-sm">{item.icon}</span>
                            <div className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: item.color}} />
                        </div>
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">{item.name}</p>
                        <p className="text-xs font-bold text-slate-900">{item.value.toLocaleString()}</p>
                        <p className="text-[9px] text-slate-500">{percentage}%</p>
                    </div>
                );
            })}
        </div>
    );
}

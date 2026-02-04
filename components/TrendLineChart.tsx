import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";
import type {TrendPoint} from "@/types/dashboard";

type TrendLineChartProps = {
    data: TrendPoint[];
};

export default function TrendLineChart({data}: TrendLineChartProps) {
    return (
        <div className="relative flex h-[360px] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-3xl" />
            
            <div className="relative mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Sentiment Trend</h2>
                    <p className="mt-1 text-sm text-slate-500">Over time analysis</p>
                </div>
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                </div>
            </div>

            <div className="relative flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{top: 5, right: 10, left: -20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                        <XAxis 
                            dataKey="time" 
                            tick={{fill: '#64748b', fontSize: 12}}
                            stroke="#cbd5e1"
                        />
                        <YAxis 
                            tick={{fill: '#64748b', fontSize: 12}}
                            stroke="#cbd5e1"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                            wrapperStyle={{paddingTop: '10px'}}
                            iconType="circle"
                            formatter={(value) => <span className="text-sm font-medium text-slate-700">{value.charAt(0).toUpperCase() + value.slice(1)}</span>}
                        />
                        <Line 
                            type="monotone"
                            dataKey="positive" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            dot={{fill: '#10b981', r: 4}}
                            activeDot={{r: 6, fill: '#10b981'}}
                        />
                        <Line 
                            type="monotone"
                            dataKey="neutral" 
                            stroke="#f59e0b" 
                            strokeWidth={3}
                            dot={{fill: '#f59e0b', r: 4}}
                            activeDot={{r: 6, fill: '#f59e0b'}}
                        />
                        <Line 
                            type="monotone"
                            dataKey="negative" 
                            stroke="#ef4444" 
                            strokeWidth={3}
                            dot={{fill: '#ef4444', r: 4}}
                            activeDot={{r: 6, fill: '#ef4444'}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function CustomTooltip({active, payload, label}: any) {
    if (!active || !payload) return null;
    
    return (
        <div className="rounded-xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur">
            <p className="mb-2 font-semibold text-slate-900">{label}</p>
            <div className="space-y-1.5">
                {payload.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: item.color}} />
                            <span className="text-sm font-medium capitalize text-slate-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

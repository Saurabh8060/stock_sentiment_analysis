import Dashboard from "@/components/Dashboard";

export default function Home() {
    return (
        <main>
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        AI-Powered Market Intelligence
                    </p>
                    <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                        Stock sentiment analysis built for fast, news-driven market research
                    </h1>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                        NewsSentinex helps you track stock sentiment from financial news,
                        monitor ticker trends, and review market mood from one dashboard.
                    </p>
                </div>
            </section>
            <Dashboard />
        </main>
    )
}

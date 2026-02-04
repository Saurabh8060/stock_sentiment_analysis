export type KPIData = {
  totalArticles: number;
  bullish: number;
  bearish: number;
  neutral: number;
};

export type SentimentDistribution = {
  positive: number;
  neutral: number;
  negative: number;
};

export type TrendPoint = {
  time: string;
  positive: number;
  neutral: number;
  negative: number;
};

export type ArticleRow = {
  title: string;
  url: string;
  source: string;
  published_at: string | null;
  sentiment: string;
  confidence: number;
};

export type DashboardData = {
  updated_at: string;
  kpis: KPIData;
  sentimentDistribution: SentimentDistribution;
  trend: TrendPoint[];
  articles: ArticleRow[];
};

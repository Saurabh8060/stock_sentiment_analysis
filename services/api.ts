import type {DashboardData} from "@/types/dashboard";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function fetchDashboard(keyword: string): Promise<DashboardData> {
  const params = new URLSearchParams({keyword});
  const res = await fetch(`${API_BASE}/dashboard?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Dashboard request failed: ${res.status}`);
  }
  const data = (await res.json()) as DashboardData;
  return data;
}

export async function requestEmailReport(payload: {
  keyword: string;
  start_date: string;
  end_date: string;
  email: string;
  max_records: number;
}): Promise<void> {
  const res = await fetch(`${API_BASE}/email/request`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Email request failed: ${res.status}`);
  }
}

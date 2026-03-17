# 📊 NewsSentinex — Stock Sentiment Dashboard

A modern web dashboard for analyzing stock sentiment using financial news data.
Built with **Next.js, TypeScript, and Recharts**, it transforms raw sentiment data into actionable insights.

---

## 🚀 Features

* 🔍 Search any stock keyword (e.g., AAPL, TSLA)
* 📊 Sentiment distribution (Positive / Neutral / Negative)
* 📈 Trend analysis over time
* 📰 Latest news with sentiment & confidence scores
* 📬 Email-based report generation
* ⚡ Fast, responsive UI with real-time updates

---

## 🛠️ Tech Stack

**Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Recharts

**Architecture**

* Component-based design
* Typed API integration
* Service layer abstraction

---

## 📂 Project Structure

```
├── app/                # Next.js app router
├── components/         # UI components
├── services/           # API layer
├── types/              # Type definitions
└── next.config.ts
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/newssentinex.git
cd newssentinex
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### 4. Run the development server

```
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔌 API Integration

### Fetch Dashboard Data

```
GET /dashboard?keyword=AAPL
```

### Request Email Report

```
POST /email/request
```

Payload:

```
{
  "keyword": "AAPL",
  "start_date": "2024-01-01",
  "end_date": "2024-01-05",
  "email": "user@example.com",
  "max_records": 1000
}
```

---

## 📊 Dashboard Overview

* **KPI Cards** → Total, Bullish, Bearish, Neutral articles
* **Pie Chart** → Sentiment distribution
* **Line Chart** → Sentiment trends over time
* **News Table** → Articles with sentiment + confidence

---

## ⚠️ Limitations

* Requires backend API to function
* Sentiment analysis is probabilistic, not predictive
* Limited historical data range

---

## 🔮 Future Improvements

* Authentication & user dashboards
* Real-time sentiment streaming
* Portfolio tracking
* Deployment (Vercel + cloud backend)

---

## 👤 Author

**Saurabh Manchanda**

---

## 🧠 Why This Project Matters

This project demonstrates:

* Building a **data-driven frontend application**
* Designing **clean UI for complex datasets**
* Working with **real-world APIs**
* Turning ML output into **usable product features**

---

## 🔗 Live Demo (Optional)

Add this once deployed:

```
https://your-app.vercel.app
```

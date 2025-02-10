"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface AnalyticsCardProps {
  title: string;
  data: { date: string; value: number }[];
  theme: string;
}

export default function AnalyticsCard({ title, data, theme }: AnalyticsCardProps) {
  return (
    <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke={theme === "dark" ? "#6B7280" : "#9CA3AF"} />
            <YAxis stroke={theme === "dark" ? "#6B7280" : "#9CA3AF"} />
            <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
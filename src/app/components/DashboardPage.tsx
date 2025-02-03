'use client';

import Sidebar from './Sidebar';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const transactionData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 500 },
  { month: 'Mar', value: 450 },
  { month: 'Apr', value: 300 },
  { month: 'May', value: 600 },
  { month: 'Jun', value: 500 },
];

const conversionData = [
  { currency: 'USD', rate: 80 },
  { currency: 'EUR', rate: 80 },
  { currency: 'GBP', rate: 80 },
  { currency: 'JPY', rate: 75 },
];

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-8">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Transactions" value="5000" />
          <StatCard title="Processed Volume" value="$5,000,000" />
          <StatCard title="Settlements" value="100" />
          <StatCard title="Last Settlement" value="2022-01-01" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Transaction Volume Over Time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionData}>
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Line type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Conversion Rates">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <XAxis dataKey="currency" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Bar dataKey="rate" fill="#374151" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
    <h3 className="text-gray-400 mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <h3 className="text-gray-400 mb-4">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
);

export default DashboardPage;
"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import { useTheme } from "./contexts/theme-context"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AnalyticsCard from "@/components/ui/AnalyticsCard"
import { volumeData, successData, paymentData } from "../data-component/analytics-data"

export default function AnalyticsPage() {
  const { theme } = useTheme()
  const [timeframe, setTimeframe] = useState("daily")

  return (
    <div className="flex w-full">
      <Sidebar />
      <main
        className={`flex-1 min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="p-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground">Detailed insights and exportable reports</p>

            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              <AnalyticsCard title="Volume Over Time" data={volumeData} theme={theme} />
              <AnalyticsCard title="Success vs. Failure" data={successData} theme={theme} />
            </div>

            {/* Payment Table */}
            <div className={`mt-8 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Over/Underpayments</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date/Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                            ${
                              payment.status === "Overpaid"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-red-500/10 text-red-500"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="p-6 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Export Data</h4>
                  <Button>Export as CSV</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
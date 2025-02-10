"use client"

import type React from "react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Sidebar from "./Sidebar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Transaction } from "./TransactionTable"
import { useTheme } from "./contexts/theme-context"

const DynamicTransactionTable = dynamic(() => import("./TransactionTable"), { ssr: false })

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "failed":
        return "bg-red-500/10 text-red-500"
      case "refunded":
        return "bg-purple-500/10 text-purple-500"
      case "returned":
        return "bg-blue-500/10 text-blue-500"
      case "partial":
        return "bg-orange-500/10 text-orange-500"
      case "expired":
        return "bg-gray-500/10 text-gray-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  )
}

const PaymentStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "exact":
        return "bg-green-500/10 text-green-500"
      case "over":
        return "bg-yellow-500/10 text-yellow-500"
      case "under":
        return "bg-red-500/10 text-red-500"
      case "partial":
        return "bg-orange-500/10 text-orange-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  )
}

const TransactionsPage: React.FC = () => {
  const { theme } = useTheme()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      // Mock transaction data
      const mockTransactions: Transaction[] = [
        {
          id: 1234,
          orderId: "TX1234",
          date: "Jan 1, 2023",
          fiatAmount: 100.0,
          cryptoAmount: 0.1,
          status: "completed",
          network: "Bitcoin",
          customerId: "C1234",
          paymentStatus: "exact",
        },
        {
          id: 1235,
          orderId: "TX1235",
          date: "Jan 2, 2023",
          fiatAmount: 75.0,
          cryptoAmount: 0.08,
          status: "pending",
          network: "Ethereum",
          customerId: "C1235",
          paymentStatus: "partial",
        },
        {
          id: 1236,
          orderId: "TX1236",
          date: "Jan 3, 2023",
          fiatAmount: 125.0,
          cryptoAmount: 0.2,
          status: "failed",
          network: "Litecoin",
          customerId: "C1236",
          paymentStatus: "over",
        },
        {
          id: 1237,
          orderId: "TX1237",
          date: "Jan 4, 2023",
          fiatAmount: 150.0,
          cryptoAmount: 0.15,
          status: "refunded",
          network: "Bitcoin Cash",
          customerId: "C1237",
          paymentStatus: "exact",
        },
        {
          id: 1238,
          orderId: "TX1238",
          date: "Jan 5, 2023",
          fiatAmount: 200.0,
          cryptoAmount: 0.25,
          status: "returned",
          network: "Ripple",
          customerId: "C1238",
          paymentStatus: "partial",
        },
        {
          id: 1239,
          orderId: "TX1239",
          date: "Jan 6, 2023",
          fiatAmount: 250.0,
          cryptoAmount: 0.3,
          status: "expired",
          network: "Dash",
          customerId: "C1239",
          paymentStatus: "under",
        },
        {
          id: 1240,
          orderId: "TX1240",
          date: "Jan 7, 2023",
          fiatAmount: 300.0,
          cryptoAmount: 0.35,
          status: "partial",
          network: "Zcash",
          customerId: "C1240",
          paymentStatus: "exact",
        },
        {
          id: 1241,
          orderId: "TX1241",
          date: "Jan 8, 2023",
          fiatAmount: 350.0,
          cryptoAmount: 0.4,
          status: "pending",
          network: "Monero",
          customerId: "C1241",
          paymentStatus: "partial",
        },
        {
          id: 1242,
          orderId: "TX1242",
          date: "Jan 9, 2023",
          fiatAmount: 400.0,
          cryptoAmount: 0.45,
          status: "completed",
          network: "Cardano",
          customerId: "C1242",
          paymentStatus: "exact",
        },
        {
          id: 1243,
          orderId: "TX1243",
          date: "Jan 10, 2023",
          fiatAmount: 450.0,
          cryptoAmount: 0.5,
          status: "failed",
          network: "Polkadot",
          customerId: "C1243",
          paymentStatus: "under",
        }
      ]
      setTransactions(mockTransactions)
    }

    fetchTransactions()
  }, [])

  return (
    <div className="flex w-full">
      <Sidebar />
      <main className={`flex-1 min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-8">Transactions</h2>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className={`grid w-full grid-cols-7 ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"} rounded-md p-1`}>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
              <TabsTrigger value="returned">Returned</TabsTrigger>
              <TabsTrigger value="partial">Partial</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <DynamicTransactionTable
                transactions={transactions}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
            <TabsContent value="pending">
              <DynamicTransactionTable
                transactions={transactions.filter((tx) => tx.status.toLowerCase() === "pending")}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
            <TabsContent value="completed">
              <DynamicTransactionTable
                transactions={transactions.filter((tx) => tx.status.toLowerCase() === "completed")}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
            <TabsContent value="failed">
              <DynamicTransactionTable
                transactions={transactions.filter((tx) => tx.status.toLowerCase() === "failed")}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
            <TabsContent value="refunded">
              <DynamicTransactionTable
                transactions={transactions.filter((tx) => tx.status.toLowerCase() === "refunded")}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
            <TabsContent value="returned">
              <DynamicTransactionTable
                transactions={transactions.filter((tx) => tx.status.toLowerCase() === "returned")}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
            <TabsContent value="partial">
              <DynamicTransactionTable
                transactions={transactions.filter((tx) => tx.status.toLowerCase() === "partial")}
                StatusBadge={StatusBadge}
                PaymentStatusBadge={PaymentStatusBadge}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default TransactionsPage
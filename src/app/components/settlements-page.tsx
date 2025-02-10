"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Sidebar from "./Sidebar"
import { useTheme } from "./contexts/theme-context"
import { Button } from "@/components/ui/button"

interface Settlement {
  id: string
  volume: string
  date: string
  amount: string
  reference: string
  status: "Pending" | "Settled"
}

const SettlementsPage: React.FC = () => {
  const { theme } = useTheme()
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  useEffect(() => {
    // Mock settlement data
    const mockSettlements: Settlement[] = [
      {
        id: "123456",
        volume: "$1200",
        date: "2023-01-15",
        amount: "USD",
        reference: "Ref123",
        status: "Pending",
      },
      {
        id: "123457",
        volume: "$1500",
        date: "2023-01-16",
        amount: "USD",
        reference: "Ref124",
        status: "Settled",
      },
      {
        id: "123458",
        volume: "$1300",
        date: "2023-01-17",
        amount: "USD",
        reference: "Ref125",
        status: "Pending",
      },
      {
        id: "123459",
        volume: "$1400",
        date: "2023-01-18",
        amount: "USD",
        reference: "Ref126",
        status: "Settled",
      },
    ]
    setSettlements(mockSettlements)
  }, [])

  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusStyles = (status: string) => {
      switch (status.toLowerCase()) {
        case "settled":
          return "bg-green-500/10 text-green-500"
        case "pending":
          return "bg-yellow-500/10 text-yellow-500"
        default:
          return "bg-gray-500/10 text-gray-500"
      }
    }

    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyles(status)}`}
      >
        {status}
      </span>
    )
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <main
        className={`flex-1 min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Fiat Settlements</h1>
          <p className="text-muted-foreground mb-8">
            Table displaying details of fiat settlements. Key columns include Settlement ID, Total Transaction Volume,
            Settlement Date, Settlement Amount, Bank/Transaction Reference, and Status.
          </p>

          <div className={`rounded-lg border ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"}`}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Volume</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Reference</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {settlements.map((settlement) => (
                    <tr
                      key={settlement.id}
                      className={`${theme === "dark" ? "hover:bg-gray-900/50" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-6 py-4 text-sm">{settlement.id}</td>
                      <td className="px-6 py-4 text-sm">{settlement.volume}</td>
                      <td className="px-6 py-4 text-sm">{settlement.date}</td>
                      <td className="px-6 py-4 text-sm">{settlement.amount}</td>
                      <td className="px-6 py-4 text-sm">{settlement.reference}</td>
                      <td className="px-6 py-4 text-sm">
                        <StatusBadge status={settlement.status} />
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              className={`flex items-center justify-between px-6 py-4 border-t ${
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettlementsPage


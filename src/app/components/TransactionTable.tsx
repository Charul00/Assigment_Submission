import type React from "react"
import { TableCell } from "@/components/ui/table"
import { useTheme } from "./contexts/theme-context" 

export interface Transaction {
  id: number
  orderId: string
  date: string
  fiatAmount: number
  cryptoAmount: number
  status: string
  network: string
  customerId: string
  paymentStatus: string
}

interface TransactionTableProps {
  transactions: Transaction[]
  StatusBadge: React.ComponentType<{ status: string }>
  PaymentStatusBadge: React.ComponentType<{ status: string }>
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, StatusBadge, PaymentStatusBadge }) => {
  const { theme } = useTheme() // Get theme

  return (
    <div className={`rounded-md border ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
      <table className="w-full">
        <thead className={`${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-gray-200 text-gray-700"}`}>
          <tr>
            <th className="px-4 py-2 text-left">Transaction ID</th>
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Date/Time</th>
            <th className="px-4 py-2 text-left">Fiat Amount</th>
            <th className="px-4 py-2 text-left">Crypto Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Payment Network/Chain</th>
            <th className="px-4 py-2 text-left">Customer Identifier</th>
            <th className="px-4 py-2 text-left">Over/Under Payment</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr
                key={tx.id}
                className={`border-t ${theme === "dark" ? "border-gray-800 hover:bg-gray-900" : "border-gray-300 hover:bg-gray-100"}`}
              >
                <TableCell>#{tx.id}</TableCell>
                <TableCell>{tx.orderId}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>${tx.fiatAmount.toFixed(2)}</TableCell>
                <TableCell>{tx.cryptoAmount}</TableCell>
                <TableCell>
                  <StatusBadge status={tx.status} />
                </TableCell>
                <TableCell>{tx.network}</TableCell>
                <TableCell>{tx.customerId}</TableCell>
                <TableCell>
                  <PaymentStatusBadge status={tx.paymentStatus} />
                </TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <TableCell colSpan={9} className="text-center py-4">
                No transactions found.
              </TableCell>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
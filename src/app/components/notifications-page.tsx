"use client"

import Sidebar from "./Sidebar"
import { useTheme } from "./contexts/theme-context"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Flag } from "lucide-react"

const notifications = [
  {
    id: "1234",
    type: "dispute",
    date: "1/2/2023 - 20:00",
  },
  {
    id: "1235",
    type: "dispute",
    date: "1/2/2023 - 20:00",
  },
  {
    id: "1236",
    type: "dispute",
    date: "1/2/2023 - 20:00",
  },
  {
    id: "1237",
    type: "dispute",
    date: "1/2/2023 - 20:00",
  },
]

export default function NotificationsPage() {
  const { theme } = useTheme()

  return (
    <div className="flex w-full">
      <Sidebar />
      <main
        className={`flex-1 min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8">Notifications</h1>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-fit grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="disputes">Disputes</TabsTrigger>
              <TabsTrigger value="aml">AML</TabsTrigger>
              <TabsTrigger value="settlements">Settlements</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <div className="mt-8 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center justify-between p-4 rounded-lg cursor-pointer
                    ${theme === "dark" ? "bg-gray-900 hover:bg-gray-800" : "bg-white hover:bg-gray-50"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                      <Flag className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dispute #{notification.id}</h3>
                      <p className="text-sm text-muted-foreground">{notification.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  )
}


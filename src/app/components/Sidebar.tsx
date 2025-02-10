"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, List, DollarSign, BarChart2, Settings, Bell, Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "./contexts/theme-context"

const menuItems = [
  { name: "Overview", icon: Home, path: "/" },
  { name: "Transactions", icon: List, path: "/transactions" },
  { name: "Settlement", icon: DollarSign, path: "/settlements" },
  { name: "Analytics", icon: BarChart2, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Notifications", icon: Bell, path: "/notifications" },
]

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`sticky top-0 flex flex-col min-h-screen h-full transition-all duration-300 
      ${isCollapsed ? "w-16" : "w-64"} 
      ${theme === "dark" ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}
      border-r`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-4 right-[-12px] p-2 rounded-full transition-all z-50
          ${theme === "dark" ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Header */}
      <div className="sticky top-0 py-4">
        <h1 className={`text-xl font-bold mb-8 text-center transition-all 
          ${isCollapsed ? "hidden" : "block"}
          ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          ARP Pay
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2 px-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <div
            key={name}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all
              ${pathname === path 
                ? theme === "dark"
                  ? "bg-gray-800 text-white" 
                  : "bg-gray-100 text-gray-900"
                : theme === "dark"
                  ? "text-gray-400 hover:bg-gray-800" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            onClick={() => router.push(path)}
          >
            <Icon className="w-6 h-6" />
            {!isCollapsed && <span className="transition-all">{name}</span>}
          </div>
        ))}
      </nav>

      {/* Theme Toggle - Icon Only */}
      <div className="sticky bottom-0 p-4">
        <button
          className={`w-full flex justify-center p-3 rounded-lg cursor-pointer transition-all
            ${theme === "dark" 
              ? "text-gray-400 hover:bg-gray-800" 
              : "text-gray-600 hover:bg-gray-100"}`}
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}

export default Sidebar
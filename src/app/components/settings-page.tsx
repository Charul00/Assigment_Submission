"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import { useTheme } from "./contexts/theme-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Copy, Check } from "lucide-react"

export default function SettingsPage() {
  const { theme } = useTheme()
  const [copied, setCopied] = useState("")

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <main
        className={`flex-1 min-h-screen ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8">Settings</h1>

          <div className="max-w-3xl space-y-8">
            {/* Business Profile */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Business Profile</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""} />
                </div>
              </div>
            </section>

            {/* API/SDK Keys */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">API/SDK Keys</h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">API Key</h3>
                      <p className="text-sm font-mono">4e5d-4a1b-8c3f</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard("4e5d-4a1b-8c3f", "api")}>
                      {copied === "api" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">SDK Key</h3>
                      <p className="text-sm font-mono">4e5d-4a1b-8c3f</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard("4e5d-4a1b-8c3f", "sdk")}>
                      {copied === "sdk" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Webhooks */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Webhooks</h2>
              <div className="space-y-2">
                <Input
                  placeholder="https://yourapp.com/webhook"
                  className={theme === "dark" ? "bg-gray-800 border-gray-700" : ""}
                />
              </div>
            </section>

            {/* Payment Preferences */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Payment Preferences</h2>
              <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="partial-payments">Partial Payments</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow your customers to pay part of their invoice with fiat, and the rest with cryptocurrency.
                    </p>
                  </div>
                  <Switch id="partial-payments" />
                </div>
              </div>
            </section>

            {/* 2FA */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
              <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Initial Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      2FA is enabled by default. You can reset it if needed.
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </section>

            <Button size="lg">Save Changes</Button>
          </div>
        </div>
      </main>
    </div>
  )
}


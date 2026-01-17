"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUnlock } from "react-icons/fa";

import { createClient } from "@/app/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { colors } from "@/config";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/app/overview")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center p-4" style={{ backgroundColor: colors.background.main }}>
      {/* <div className="" style={{display: "flex", padding: "2rem", borderRadius: "1rem", textAlign: "center", backgroundColor: "rgba(20, 235, 163, 0.1)"}}>
        <p className="text-5xl mb-10 font-mono" style={{color: "rgba(20, 235, 163, 1)", fontSize: "4rem"}}>Ω</p>
      </div> */}
      <Card className="w-full max-w-md border-none" style={{ backgroundColor: "transparent" }}>
        <CardContent className="p-0">
          <h3 className="text-2xl font-bold mb-2 font-mono">Welcome back</h3>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="**********"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-800 border-slate-700 text-slate-100 font-mono placeholder:text-slate-500"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm bg-red-950/50 p-3 rounded border border-red-900 font-mono">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              style={{ backgroundColor: "rgba(20, 235, 163, 0.1)", border: "1px solid rgb(20, 235, 163)" }}
            >
              <p className="font-mono text-xs" style={{ color: "rgb(20, 235, 163)" }}>{loading ? "Verifying..." : <FaUnlock className="mr-2 h-3 w-3" />}</p>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

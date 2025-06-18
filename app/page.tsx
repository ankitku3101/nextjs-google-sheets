'use client'

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Info } from "lucide-react"

export default function CertificateChecker() {
  const [regdNo, setRegdNo] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const check = async () => {
    setLoading(true)
    setStatus(null)

    const res = await fetch('/api/check-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ regdNo }),
    })

    const data = await res.json()
    setStatus(data.status)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Certificate Status Checker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter Registration No"
            value={regdNo}
            onChange={(e: any) => setRegdNo(e.target.value)}
            className="bg-white"
          />
          <Button
            onClick={check}
            disabled={loading || !regdNo.trim()}
            className="w-full"
          >
            {loading ? "Checking..." : "Check Status"}
          </Button>

          {status === 'issued' && (
            <Alert variant="default" className="border-green-500">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-700">Certificate Issued</AlertTitle>
              <AlertDescription>Your certificate has been issued successfully.</AlertDescription>
            </Alert>
          )}

          {status === 'not_issued' && (
            <Alert variant="destructive" className="border-red-500">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-700">Not Issued</AlertTitle>
              <AlertDescription>Your certificate has not been issued yet.</AlertDescription>
            </Alert>
          )}

          {status === 'not_found' && (
            <Alert variant="default" className="border-gray-400">
              <Info className="h-4 w-4 text-gray-600" />
              <AlertTitle className="text-gray-700">Not Found</AlertTitle>
              <AlertDescription>No certificate found for this registration number.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

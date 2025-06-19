'use client'

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Info, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center w-full">
            <div>
              <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pretty">
                Integrating Google Sheets in Next.js
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground text-base sm:text-lg lg:text-xl">
                This is an example project for checking whether a certificate is issued or not based on data present in a Google Sheet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-2">
              <Link href="https://docs.google.com/spreadsheets/d/11AB8DQ29uDhfF0mJK7FTc8z-LLWU1EBkBfiKKaG1YK0/edit?usp=sharing" passHref>
                <Button className="w-full sm:w-auto cursor-pointer">
                  Google Sheet
                  <ExternalLink className="ml-1 h-4" />
                </Button>
              </Link>
              <Link href="https://github.com/ankitku3101/nextjs-google-sheets" passHref>
                <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
                  Source Code
                  <Github className="ml-1 h-4" />
                </Button>
              </Link>
            </div>

            <p className="text-sm sm:text-base font-medium text-muted-foreground text-center max-w-md">
              You can add data in the sheet using the link above and check the status here.
            </p>

            <Card className="w-full max-w-md shadow-lg rounded-xl mt-6">
              <CardHeader>
                <CardTitle className="text-center text-xl sm:text-2xl">Check Certificate Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter Registration No"
                  value={regdNo}
                  onChange={(e) => setRegdNo(e.target.value)}
                />
                <Button
                  onClick={check}
                  disabled={loading || !regdNo.trim()}
                  className="w-full cursor-pointer"
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
          </div>
        </div>
      </div>
    </section>
  )
}

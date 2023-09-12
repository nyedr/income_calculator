"use client"

import { useState } from "react"

import { IncomeInfo } from "@/lib/validation/incomeInfo"
import { Calculator } from "@/components/calculator"
import { Header } from "@/components/header"
import { Results } from "@/components/results"

export default function IndexPage() {
  const [incomeResults, setIncomeResults] = useState<IncomeInfo | null>(null)

  return (
    <main className="container">
      <Header />
      <div className="flex flex-col items-center gap-8 md:gap-5 md:items-start md:flex-row">
        <Calculator setIncomeResults={setIncomeResults} />
        {incomeResults == null ? (
          <hr className="invisible w-full" />
        ) : (
          <Results incomeResults={incomeResults} />
        )}
      </div>
    </main>
  )
}

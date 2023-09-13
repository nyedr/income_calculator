import { calculateIncomeDetails } from "@/lib/utils"
import { IncomeInfo } from "@/lib/validation/incomeInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { ResultsTab } from "@/components/results-tab"

export const Results = ({ incomeResults }: { incomeResults: IncomeInfo }) => {
  const incomeDetails = calculateIncomeDetails(incomeResults)

  return (
    <section
      id="results"
      className={`flex flex-col items-start w-full max-w-lg gap-3 p-2 pt-0 mx-auto md:p-8 ${
        incomeResults.paymentAmount === 0 && "invisible"
      }`}
    >
      <Tabs className="w-full" defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <ResultsTab
            {...{ ...incomeResults, ...incomeDetails.weeklyIncome }}
          />
        </TabsContent>
        <TabsContent value="monthly">
          <ResultsTab
            {...{ ...incomeResults, ...incomeDetails.monthlyIncome }}
          />
        </TabsContent>
        <TabsContent value="yearly">
          <ResultsTab
            {...{ ...incomeResults, ...incomeDetails.yearlyIncome }}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}

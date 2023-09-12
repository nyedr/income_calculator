import type { IncomeDetails } from "@/types/income"
import {
  calculateIncomeDetails,
  numberWithCommas,
  snakeToNormalText,
} from "@/lib/utils"
import { IncomeInfo } from "@/lib/validation/incomeInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TabDetails = ({
  income,
  netIncome,
  taxBreakdown,
  totalTax,
  paymentType,
  paymentAmount,
  hoursWorkedWeekly,
}: IncomeDetails & IncomeInfo) => {
  const taxBreakdownEntries = Object.entries(taxBreakdown)
  const federalTaxes = taxBreakdownEntries.filter(([key, _]) =>
    ["federal_income_tax", "medicare_tax", "social_security_tax"].includes(key)
  )
  const totalFederalTaxes = federalTaxes.reduce((num, [_, a]) => num + a, 0)

  const stateTaxes = taxBreakdownEntries.filter(([key, _]) =>
    [
      "state_income_tax",
      "state_disability_insurance",
      "family_leave_insurance",
    ].includes(key)
  )
  const totalStateTaxes = stateTaxes.reduce((num, [_, a]) => num + a, 0)

  return (
    <div className="flex flex-col items-start w-full gap-3">
      <div className="flex items-center justify-between w-full mt-2">
        <h3 className="text-xl font-semibold">Earnings</h3>
        <h3 className="text-xl font-semibold">${numberWithCommas(income)}</h3>
      </div>

      <div className="flex flex-col items-start w-full gap-1">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg">
            {paymentType === "hourly" ? "Hourly" : "Salary"}
          </span>
          <span className="text-lg">${numberWithCommas(income)}</span>
        </div>
        {/* {paymentType === "hourly" && (
          <span className="text-base">{`(${hoursWorkedWeekly} hrs * $${numberWithCommas(
            paymentAmount
          )})`}</span>
        )} */}
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <h3 className="text-xl font-semibold">Taxes</h3>
        <h3 className="text-xl font-semibold">${numberWithCommas(totalTax)}</h3>
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <h3 className="text-lg font-semibold">Federal Taxes</h3>
        <h3 className="text-lg font-semibold">
          ${numberWithCommas(totalFederalTaxes)}
        </h3>
      </div>

      <div className="flex flex-col items-start w-full gap-1">
        {federalTaxes.map(([name, amount], idx) => (
          <div key={idx} className="flex items-center justify-between w-full">
            <span className="text-base">{snakeToNormalText(name)}</span>
            <span className="text-base">${numberWithCommas(amount)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <h3 className="text-lg font-semibold">New York Taxes</h3>
        <h3 className="text-lg font-semibold">
          ${numberWithCommas(totalStateTaxes)}
        </h3>
      </div>

      <div className="flex flex-col items-start w-full gap-1">
        {stateTaxes.map(([name, amount], idx) => (
          <div key={idx} className="flex items-center justify-between w-full">
            <span className="text-base">{snakeToNormalText(name)}</span>
            <span className="text-base">${numberWithCommas(amount)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-2">
        <h3 className="text-xl font-semibold">Take Home</h3>
        <h3 className="text-xl font-semibold">
          ${numberWithCommas(netIncome)}
        </h3>
      </div>
    </div>
  )
}

export const Results = ({ incomeResults }: { incomeResults: IncomeInfo }) => {
  const incomeDetails = calculateIncomeDetails(incomeResults)

  return (
    <section
      id="results"
      className="flex flex-col items-start w-full max-w-lg gap-3 p-4 pt-0 mx-auto md:p-8"
    >
      <Tabs className="w-full" defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <TabDetails
            {...{ ...incomeResults, ...incomeDetails.weeklyIncome }}
          />
        </TabsContent>
        <TabsContent value="monthly">
          <TabDetails
            {...{ ...incomeResults, ...incomeDetails.monthlyIncome }}
          />
        </TabsContent>
        <TabsContent value="yearly">
          <TabDetails
            {...{ ...incomeResults, ...incomeDetails.yearlyIncome }}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}

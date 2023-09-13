import type { IncomeDetails } from "@/types/income"
import { numberWithCommas, snakeToNormalText } from "@/lib/utils"
import { IncomeInfo } from "@/lib/validation/incomeInfo"

export const ResultsTab = ({
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

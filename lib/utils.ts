import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { IncomeDetailsResult } from "@/types/income"
import { IncomeInfo } from "@/lib/validation/incomeInfo"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleMoneyInputUS(
  e: ChangeEvent<HTMLInputElement>,
  setIncomeInfo: Dispatch<SetStateAction<IncomeInfo>>,
  setDisplayPaymentAmount: Dispatch<SetStateAction<string>>
) {
  let value = +e.target.value.replace(/[^0-9]/g, "")

  console.log(value)

  setIncomeInfo((prev) => ({
    ...prev,
    paymentAmount: value,
  }))

  const formattedValue = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })

  setDisplayPaymentAmount(formattedValue)
}

export function numberWithCommas(num: number) {
  return num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function numberWithoutCommas(num: string) {
  return num.replace(/,/g, "")
}

export function snakeToNormalText(str: string) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

type TaxBracket = {
  rate: number
  lowerBound: number
  upperBound: number
  baseTax: number
}

// Function to calculate the total federal tax based on tax brackets
function calculateFederalTax(yearlyIncome: number): number {
  // Define the tax brackets
  const taxBrackets: TaxBracket[] = [
    { rate: 0.1, lowerBound: 0, upperBound: 11000, baseTax: 0 },
    { rate: 0.12, lowerBound: 11001, upperBound: 44725, baseTax: 1100 },
    { rate: 0.22, lowerBound: 44726, upperBound: 95375, baseTax: 5147 },
    { rate: 0.24, lowerBound: 95376, upperBound: 182100, baseTax: 16290 },
    { rate: 0.32, lowerBound: 182101, upperBound: 231250, baseTax: 37104 },
    { rate: 0.35, lowerBound: 231251, upperBound: 578125, baseTax: 52832 },
    {
      rate: 0.37,
      lowerBound: 578126,
      upperBound: Infinity,
      baseTax: 174238.25,
    },
  ]

  let totalTax: number = 0

  for (const bracket of taxBrackets) {
    if (yearlyIncome > bracket.lowerBound) {
      const incomeInBracket =
        Math.min(yearlyIncome, bracket.upperBound) - bracket.lowerBound + 1
      totalTax = bracket.baseTax + incomeInBracket * bracket.rate

      // If the income is fully within this bracket, break out of the loop
      if (yearlyIncome <= bracket.upperBound) {
        break
      }
    }
  }

  return totalTax
}

// Function to calculate the total New York state tax based on tax brackets
function calculateStateTax(yearlyIncome: number): number {
  // Define the tax brackets for New York state
  const stateTaxBrackets: TaxBracket[] = [
    { rate: 0.04, lowerBound: 0, upperBound: 8500, baseTax: 0 },
    { rate: 0.045, lowerBound: 8501, upperBound: 11700, baseTax: 340 },
    { rate: 0.0525, lowerBound: 11701, upperBound: 13900, baseTax: 484 },
    { rate: 0.0585, lowerBound: 13901, upperBound: 80650, baseTax: 600 },
    { rate: 0.0625, lowerBound: 80651, upperBound: 215400, baseTax: 4504 },
    { rate: 0.0685, lowerBound: 215401, upperBound: 1077550, baseTax: 12926 },
    { rate: 0.0965, lowerBound: 1077551, upperBound: 5000000, baseTax: 71984 },
    { rate: 0.103, lowerBound: 5000001, upperBound: 25000000, baseTax: 450500 },
    {
      rate: 0.109,
      lowerBound: 25000001,
      upperBound: Infinity,
      baseTax: 2510500,
    },
  ]

  let totalTax: number = 0

  for (const bracket of stateTaxBrackets) {
    if (yearlyIncome > bracket.lowerBound) {
      const incomeInBracket =
        Math.min(yearlyIncome, bracket.upperBound) - bracket.lowerBound + 1
      totalTax = bracket.baseTax + incomeInBracket * bracket.rate

      // If the income is fully within this bracket, break out of the loop
      if (yearlyIncome <= bracket.upperBound) {
        break
      }
    }
  }

  return totalTax
}

// Function to calculate income details
export function calculateIncomeDetails({
  paymentAmount,
  paymentType,
  hoursWorkedWeekly,
}: IncomeInfo): IncomeDetailsResult {
  // Tax rates
  const MEDICARE_TAX_RATE = 0.0145
  const SOCIAL_SECURITY_TAX_RATE = 0.062
  const STATE_DISABILITY_INSURANCE_RATE = 0.009
  const FAMILY_LEAVE_INSURANCE_RATE = 0.00455
  const TAXABLE_INCOME_MULTIPLIER = 0.8615

  let yearlyIncome: number

  if (paymentType === "hourly") {
    yearlyIncome = paymentAmount * (hoursWorkedWeekly ?? 0) * 52
  } else {
    yearlyIncome = paymentAmount
  }

  // Calculate individual taxes
  const federal_income_tax = calculateFederalTax(
    yearlyIncome * TAXABLE_INCOME_MULTIPLIER
  )
  const medicare_tax = yearlyIncome * MEDICARE_TAX_RATE
  const social_security_tax = yearlyIncome * SOCIAL_SECURITY_TAX_RATE
  const state_income_tax = calculateStateTax(
    yearlyIncome * TAXABLE_INCOME_MULTIPLIER
  )
  const state_disability_insurance =
    yearlyIncome * STATE_DISABILITY_INSURANCE_RATE
  const family_leave_insurance = yearlyIncome * FAMILY_LEAVE_INSURANCE_RATE

  const totalTax =
    federal_income_tax +
    medicare_tax +
    social_security_tax +
    state_income_tax +
    state_disability_insurance +
    family_leave_insurance

  // Calculate net income
  const yearlyNetIncome = yearlyIncome - totalTax

  // Calculate weekly and monthly details
  const weeklyIncome = yearlyIncome / 52
  const weeklyTax = totalTax / 52
  const weeklyNetIncome = weeklyIncome - weeklyTax

  const monthlyIncome = yearlyIncome / 12
  const monthlyTax = totalTax / 12
  const monthlyNetIncome = monthlyIncome - monthlyTax

  return {
    weeklyIncome: {
      netIncome: weeklyNetIncome,
      totalTax: weeklyTax,
      income: weeklyIncome,
      taxBreakdown: {
        federal_income_tax: federal_income_tax / 52,
        medicare_tax: medicare_tax / 52,
        social_security_tax: social_security_tax / 52,
        state_income_tax: state_income_tax / 52,
        state_disability_insurance: state_disability_insurance / 52,
        family_leave_insurance: family_leave_insurance / 52,
      },
    },
    monthlyIncome: {
      netIncome: monthlyNetIncome,
      totalTax: monthlyTax,
      income: monthlyIncome,
      taxBreakdown: {
        federal_income_tax: federal_income_tax / 12,
        medicare_tax: medicare_tax / 12,
        social_security_tax: social_security_tax / 12,
        state_income_tax: state_income_tax / 12,
        state_disability_insurance: state_disability_insurance / 12,
        family_leave_insurance: family_leave_insurance / 12,
      },
    },
    yearlyIncome: {
      netIncome: yearlyNetIncome,
      totalTax: totalTax,
      income: yearlyIncome,
      taxBreakdown: {
        federal_income_tax,
        medicare_tax,
        social_security_tax,
        state_income_tax,
        state_disability_insurance,
        family_leave_insurance,
      },
    },
  }
}

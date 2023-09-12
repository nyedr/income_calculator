export interface IncomeDetails {
  netIncome: number
  totalTax: number
  income: number
  taxBreakdown: {
    federal_income_tax: number
    medicare_tax: number
    social_security_tax: number
    state_income_tax: number
    state_disability_insurance: number
    family_leave_insurance: number
  }
}

export interface IncomeDetailsResult {
  weeklyIncome: IncomeDetails
  monthlyIncome: IncomeDetails
  yearlyIncome: IncomeDetails
}

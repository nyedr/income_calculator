import { z } from "zod"

export const incomeInfoSchema = z.object({
  paymentType: z.enum(["hourly", "salary"]).default("hourly"),
  paymentAmount: z.number().positive(),
  hoursWorkedWeekly: z.number().positive().optional(),
})

export type IncomeInfo = z.infer<typeof incomeInfoSchema>

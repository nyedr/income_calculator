"use client"

import React, { useState, type Dispatch, type SetStateAction } from "react"

import { IncomeInfo, incomeInfoSchema } from "@/lib/validation/incomeInfo"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"

import { Button } from "./ui/button"

export const Calculator = ({
  setIncomeResults,
}: {
  setIncomeResults: Dispatch<SetStateAction<IncomeInfo | null>>
}) => {
  const [incomeInfo, setIncomeInfo] = useState<IncomeInfo>({
    paymentType: "hourly",
    paymentAmount: 0,
    hoursWorkedWeekly: 0,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // synchronously validate the form data
    const result = incomeInfoSchema.safeParse(incomeInfo)

    if (!result.success) {
      toast({
        type: "error",
        title: "Invalid form data",
        message: result.error.message,
        duration: 2500,
      })
      return
    }

    setIncomeResults(result.data)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    console.log("Form submitted")

    if (typeof e === "string") {
      setIncomeInfo((prev) => ({
        ...prev,
        paymentType: e as "hourly" | "salary",
      }))
      return
    }

    const { id, value } = e.target as HTMLInputElement

    setIncomeInfo((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  return (
    <section
      id="calculator"
      className="w-full p-4 pt-0 mx-auto md:p-8 max-w-7xl"
    >
      <h1 className="mt-0 mb-5 text-3xl font-bold">Income Calculator</h1>
      <form className="flex flex-col items-start gap-5" onSubmit={handleSubmit}>
        <h2 className="mb-0 text-2xl font-semibold">How are you paid?</h2>
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="paymentType" className="text-sm font-medium">
              Type
            </label>
            <Select
              defaultValue="hourly"
              onValueChange={(val) =>
                setIncomeInfo((prev) => ({
                  ...prev,
                  paymentType: val as "hourly" | "salary",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue>{incomeInfo.paymentType}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">hourly</SelectItem>
                <SelectItem value="salary">salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="hoursWorkedWeekly" className="text-sm font-medium">
              {incomeInfo.paymentType === "salary"
                ? "Gross pay method"
                : "Hours"}
            </label>
            {incomeInfo.paymentType === "salary" ? (
              <Input type="text" value="Per Year" disabled />
            ) : (
              <Input
                id="hoursWorkedWeekly"
                type="number"
                onChange={(e) =>
                  setIncomeInfo({
                    ...incomeInfo,
                    hoursWorkedWeekly: +e.target.value,
                  })
                }
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="paymentAmount" className="text-sm font-medium">
              Amount
            </label>
            <Input
              onChange={(e) =>
                setIncomeInfo((prev) => ({
                  ...prev,
                  paymentAmount: +e.target.value,
                }))
              }
              placeholder="$0.00"
              id="paymentAmount"
              type="number"
            />
          </div>
        </div>
        <Button type="submit">Calculate</Button>
      </form>
    </section>
  )
}

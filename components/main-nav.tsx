"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  const { theme } = useTheme()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo theme={theme as "light" | "dark"} className="w-6 h-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
    </div>
  )
}

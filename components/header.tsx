import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export const Header = () => {
  return (
    <section className="grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Gross-to-net calculator, estimate your take-home pay
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Note: The salary calculator here is for general guidance only and
          should not be used for exact tax or payroll calculations. It{"'"}s not
          affiliated with any service of our services and doesn{"'"}t offer tax
          or legal advice. Consult a professional for specific financial
          concerns.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Sources
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
      <hr className="mt-10" />
    </section>
  )
}

"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

export const meta = {
  name: "chart",
  title: "Chart",
  description: "A bar chart colored with the chart tokens.",
  variants: [] as const,
}

const data = [
  { month: "Jan", visitors: 120 },
  { month: "Feb", visitors: 186 },
  { month: "Mar", visitors: 154 },
  { month: "Apr", visitors: 209 },
]

const config = {
  visitors: { label: "Visitors", color: "var(--chart-1)" },
} satisfies ChartConfig

export function Example() {
  return (
    <ChartContainer config={config} className="w-full max-w-lg">
      <BarChart data={data}>
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

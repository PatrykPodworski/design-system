import { Badge } from "@workspace/ui/components/badge"

export const meta = {
  name: "badge",
  title: "Badge",
  description: "A short status label or count.",
  variants: ["default", "secondary", "outline", "destructive", "ghost"],
}

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}

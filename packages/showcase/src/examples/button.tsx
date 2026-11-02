import { BellIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export const meta = {
  name: "button",
  title: "Button",
  description: "The main action of a view, and the quieter actions beside it.",
  variants: ["default", "secondary", "outline", "ghost", "destructive", "link"],
}

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button disabled>Disabled</Button>
      <Button size="icon" aria-label="Notifications">
        <BellIcon />
      </Button>
    </div>
  )
}

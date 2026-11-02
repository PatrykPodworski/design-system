import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

export const meta = {
  name: "switch",
  title: "Switch",
  description: "An on or off setting.",
  variants: [] as const,
}

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Notifications</Label>
    </div>
  )
}

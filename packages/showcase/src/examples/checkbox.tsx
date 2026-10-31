import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

export const meta = {
  name: "checkbox",
  title: "Checkbox",
  description: "A yes or no choice, with a visible label.",
  variants: [] as const,
}

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  )
}

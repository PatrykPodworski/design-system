import { Label } from "@workspace/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"

export const meta = {
  name: "radio-group",
  title: "Radio group",
  description: "Pick one option from a few.",
  variants: [] as const,
}

export function Example() {
  return (
    <RadioGroup defaultValue="comfortable" aria-label="Density">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="density-comfortable" />
        <Label htmlFor="density-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="density-compact" />
        <Label htmlFor="density-compact">Compact</Label>
      </div>
    </RadioGroup>
  )
}

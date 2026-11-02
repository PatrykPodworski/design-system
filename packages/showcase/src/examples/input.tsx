import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export const meta = {
  name: "input",
  title: "Input",
  description: "A single-line text field.",
  variants: [] as const,
}

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="name@example.com" />
    </div>
  )
}

import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

export const meta = {
  name: "label",
  title: "Label",
  description: "The visible name of a form control.",
  variants: [] as const,
}

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="project">Project name</Label>
      <Input id="project" placeholder="Design system" />
    </div>
  )
}

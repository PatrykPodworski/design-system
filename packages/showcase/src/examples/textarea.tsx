import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

export const meta = {
  name: "textarea",
  title: "Textarea",
  description: "A multi-line text field.",
  variants: [] as const,
}

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type a message" />
    </div>
  )
}

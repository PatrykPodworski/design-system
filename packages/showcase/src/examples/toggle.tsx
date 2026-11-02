import { Toggle } from "@workspace/ui/components/toggle"

export const meta = {
  name: "toggle",
  title: "Toggle",
  description: "A button that stays pressed or not.",
  variants: ["default", "outline"],
}

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle aria-label="Bold" defaultPressed>
        Bold
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        Italic
      </Toggle>
    </div>
  )
}

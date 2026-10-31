import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"

export const meta = {
  name: "kbd",
  title: "Kbd",
  description: "A keyboard key, shown next to a shortcut.",
  variants: [] as const,
}

export function Example() {
  return (
    <p className="flex items-center gap-2 text-sm">
      Press
      <KbdGroup>
        <Kbd>d</Kbd>
      </KbdGroup>
      to toggle dark mode.
    </p>
  )
}

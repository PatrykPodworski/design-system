import { ScrollArea } from "@workspace/ui/components/scroll-area"

export const meta = {
  name: "scroll-area",
  title: "Scroll area",
  description: "A box that scrolls when its content is taller than it.",
  variants: [] as const,
}

const lines = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "border",
]

export function Example() {
  return (
    <ScrollArea className="h-40 w-full max-w-xs rounded-xl border">
      <ul className="flex flex-col gap-2 p-4 text-sm">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </ScrollArea>
  )
}

import { Separator } from "@workspace/ui/components/separator"

export const meta = {
  name: "separator",
  title: "Separator",
  description: "A line between two groups of content.",
  variants: ["horizontal", "vertical"],
}

export function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <p className="text-sm">Theme</p>
      <Separator />
      <div className="flex h-8 items-center gap-3 text-sm">
        <span>Light</span>
        <Separator orientation="vertical" />
        <span>Dark</span>
      </div>
    </div>
  )
}

import { DirectionProvider } from "@workspace/ui/components/direction"

export const meta = {
  name: "direction",
  title: "Direction",
  description: "Set left-to-right or right-to-left for a subtree.",
  variants: ["ltr", "rtl"],
}

export function Example() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 text-sm">
      <DirectionProvider direction="ltr">
        <p className="rounded-xl border p-3">Start is on the left.</p>
      </DirectionProvider>
      <DirectionProvider direction="rtl">
        <p className="rounded-xl border p-3">Start is on the right.</p>
      </DirectionProvider>
    </div>
  )
}

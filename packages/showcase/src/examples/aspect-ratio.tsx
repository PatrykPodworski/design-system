import { AspectRatio } from "@workspace/ui/components/aspect-ratio"

export const meta = {
  name: "aspect-ratio",
  title: "Aspect ratio",
  description: "Hold a box to a fixed width-to-height ratio.",
  variants: [] as const,
}

export function Example() {
  return (
    <AspectRatio ratio={16 / 9} className="w-full max-w-sm rounded-xl bg-muted">
      <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
        16:9
      </div>
    </AspectRatio>
  )
}

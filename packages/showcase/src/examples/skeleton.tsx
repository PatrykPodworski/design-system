import { Skeleton } from "@workspace/ui/components/skeleton"

export const meta = {
  name: "skeleton",
  title: "Skeleton",
  description: "A placeholder while content is loading.",
  variants: [] as const,
}

export function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

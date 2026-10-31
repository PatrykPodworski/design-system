import { Progress } from "@workspace/ui/components/progress"

export const meta = {
  name: "progress",
  title: "Progress",
  description: "How far a task has got.",
  variants: [] as const,
}

export function Example() {
  return <Progress value={60} className="w-full max-w-sm" aria-label="Upload" />
}

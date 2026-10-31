import { Spinner } from "@workspace/ui/components/spinner"

export const meta = {
  name: "spinner",
  title: "Spinner",
  description: "Shows that an action is in progress.",
  variants: [] as const,
}

export function Example() {
  return <Spinner />
}

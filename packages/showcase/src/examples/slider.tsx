import { Slider } from "@workspace/ui/components/slider"

export const meta = {
  name: "slider",
  title: "Slider",
  description: "Pick a number inside a range.",
  variants: [] as const,
}

export function Example() {
  return (
    <Slider
      defaultValue={[40]}
      max={100}
      className="w-full max-w-sm"
      aria-label="Volume"
    />
  )
}

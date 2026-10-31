import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

export const meta = {
  name: "toggle-group",
  title: "Toggle group",
  description: "A set of toggles, one or several pressed at a time.",
  variants: [] as const,
}

export function Example() {
  return (
    <ToggleGroup defaultValue={["bold"]} aria-label="Text style">
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  )
}

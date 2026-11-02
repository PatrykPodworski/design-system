import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"

export const meta = {
  name: "input-group",
  title: "Input group",
  description: "An input with text or an icon attached to it.",
  variants: [] as const,
}

export function Example() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="example.com" aria-label="Site address" />
    </InputGroup>
  )
}

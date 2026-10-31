import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"

export const meta = {
  name: "button-group",
  title: "Button group",
  description: "Related actions joined into one control.",
  variants: [] as const,
}

export function Example() {
  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  )
}

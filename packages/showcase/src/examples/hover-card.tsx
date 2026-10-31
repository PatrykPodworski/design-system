import { Button } from "@workspace/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

export const meta = {
  name: "hover-card",
  title: "Hover card",
  description: "A preview that opens on hover or focus.",
  variants: [] as const,
}

export function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="outline" />}>
        v0.3.0
      </HoverCardTrigger>
      <HoverCardContent>
        The release that adds Cutive as the serif font.
      </HoverCardContent>
    </HoverCard>
  )
}

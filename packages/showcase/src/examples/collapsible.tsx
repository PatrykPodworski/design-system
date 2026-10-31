import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

export const meta = {
  name: "collapsible",
  title: "Collapsible",
  description: "Show or hide one extra section.",
  variants: [] as const,
}

export function Example() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col items-start gap-3">
      <CollapsibleTrigger render={<Button variant="outline" />}>
        Release notes
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm text-muted-foreground">
        v0.3.0 adds Cutive as the serif font.
      </CollapsibleContent>
    </Collapsible>
  )
}

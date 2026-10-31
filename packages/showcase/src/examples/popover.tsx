import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

export const meta = {
  name: "popover",
  title: "Popover",
  description: "A small panel anchored to a button.",
  variants: [] as const,
}

export function Example() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Dimensions
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the layer size.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

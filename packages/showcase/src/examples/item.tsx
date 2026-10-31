import { FileTextIcon } from "lucide-react"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"

export const meta = {
  name: "item",
  title: "Item",
  description: "A row in a list: icon, title and description.",
  variants: ["default", "outline", "muted"],
}

export function Example() {
  return (
    <ItemGroup className="w-full max-w-sm">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Notes</ItemTitle>
          <ItemDescription>Edited today</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Archive</ItemTitle>
          <ItemDescription>12 files</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}

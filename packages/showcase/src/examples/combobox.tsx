"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"

export const meta = {
  name: "combobox",
  title: "Combobox",
  description: "Search a list, then pick one item.",
  variants: [] as const,
}

const fruits = ["Apple", "Banana", "Cherry"]

export function Example() {
  return (
    <Combobox items={fruits}>
      <ComboboxInput placeholder="Search a fruit" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

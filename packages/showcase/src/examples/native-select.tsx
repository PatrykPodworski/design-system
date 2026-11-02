import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

export const meta = {
  name: "native-select",
  title: "Native select",
  description: "The browser's own select, styled to match the theme.",
  variants: ["default", "sm"],
}

export function Example() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="fruit">Fruit</Label>
      <NativeSelect id="fruit" defaultValue="apple">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="pear">Pear</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
      <Label htmlFor="fruit-sm">Fruit, small</Label>
      <NativeSelect id="fruit-sm" size="sm" defaultValue="pear">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="pear">Pear</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}

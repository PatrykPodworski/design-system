import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export const meta = {
  name: "field",
  title: "Field",
  description: "A label, a control and a short description, kept together.",
  variants: [] as const,
}

export function Example() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="display-name">Display name</FieldLabel>
      <Input id="display-name" placeholder="Ada Lovelace" />
      <FieldDescription>Shown on your profile.</FieldDescription>
    </Field>
  )
}

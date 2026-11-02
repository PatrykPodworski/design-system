import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

export const meta = {
  name: "sheet",
  title: "Sheet",
  description: "A panel that slides in from the side.",
  variants: [] as const,
}

export function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Settings
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>A panel from the side.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

"use client"

import { Button } from "@workspace/ui/components/button"
import { Toaster, toast } from "@workspace/ui/components/toast"

export const meta = {
  name: "toast",
  title: "Toast",
  description: "A short confirmation after an action.",
  variants: [] as const,
}

export function Example() {
  return (
    <Toaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({
            title: "Saved",
            description: "Your changes were saved.",
          })
        }
      >
        Show toast
      </Button>
    </Toaster>
  )
}

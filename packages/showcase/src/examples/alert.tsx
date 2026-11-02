import { InfoIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"

export const meta = {
  name: "alert",
  title: "Alert",
  description: "A message that stays inside the page.",
  variants: ["default", "destructive"],
}

export function Example() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          Theme tokens come from one shared stylesheet.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Something failed</AlertTitle>
        <AlertDescription>The change was not saved.</AlertDescription>
      </Alert>
    </div>
  )
}

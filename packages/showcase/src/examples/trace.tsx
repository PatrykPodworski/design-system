import { CheckIcon, LoaderIcon } from "lucide-react"

import {
  Trace,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@workspace/ui/components/trace"

export const meta = {
  name: "trace",
  title: "Trace",
  description: "A list of steps an action has taken.",
  variants: ["running", "error", "pending"],
}

export function Example() {
  return (
    <Trace className="w-full max-w-sm">
      <TraceLine>
        <TraceIcon>
          <CheckIcon />
        </TraceIcon>
        <TraceTitle>Read the file</TraceTitle>
        <TraceDescription>12 ms</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <LoaderIcon />
        </TraceIcon>
        <TraceTitle>Build the page</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceTitle>Publish</TraceTitle>
      </TraceLine>
    </Trace>
  )
}

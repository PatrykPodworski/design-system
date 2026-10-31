import { Marker, MarkerContent } from "@workspace/ui/components/marker"

export const meta = {
  name: "marker",
  title: "Marker",
  description: "A line that marks a point in a list, such as a day.",
  variants: ["default", "separator", "border"],
}

export function Example() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Marker>
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Yesterday</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Last week</MarkerContent>
      </Marker>
    </div>
  )
}

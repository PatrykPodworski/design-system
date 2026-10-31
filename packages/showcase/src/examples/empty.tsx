import { FolderOpenIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"

export const meta = {
  name: "empty",
  title: "Empty",
  description: "What to show when a list has nothing in it yet.",
  variants: ["icon"],
}

export function Example() {
  return (
    <Empty className="w-full max-w-sm border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>
          Create a project to see it listed here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Create project</Button>
      </EmptyContent>
    </Empty>
  )
}

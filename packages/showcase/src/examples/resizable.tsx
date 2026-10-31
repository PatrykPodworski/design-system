import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable"

export const meta = {
  name: "resizable",
  title: "Resizable",
  description: "Two panes with a handle between them.",
  variants: [] as const,
}

export function Example() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-40 w-full max-w-md rounded-xl border"
    >
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center text-sm">
          One
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center text-sm">
          Two
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

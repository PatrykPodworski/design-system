"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

export function DialogInNativeDialog() {
  const nativeDialogRef = React.useRef<HTMLDialogElement>(null)
  const [isInnerOpen, setIsInnerOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => nativeDialogRef.current?.showModal()}
      >
        Dialog in a native dialog
      </Button>
      <dialog
        ref={nativeDialogRef}
        // Escape fires `cancel` on the native dialog too; close only the inner one.
        onCancel={(event) => isInnerOpen && event.preventDefault()}
        className="m-auto flex-col gap-4 rounded-4xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/5 backdrop:bg-overlay open:flex"
      >
        <p>This is a native modal dialog in the top layer.</p>
        <Dialog open={isInnerOpen} onOpenChange={setIsInnerOpen}>
          <DialogTrigger render={<Button variant="outline" />}>
            Open a dialog inside
          </DialogTrigger>
          <DialogContent portalProps={{ container: nativeDialogRef }}>
            <DialogHeader>
              <DialogTitle>Inside the native dialog</DialogTitle>
              <DialogDescription>
                It renders into the native dialog, so it shows above it.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
        <Button onClick={() => nativeDialogRef.current?.close()}>Close</Button>
      </dialog>
    </>
  )
}

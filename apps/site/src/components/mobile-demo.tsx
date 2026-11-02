import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

export function MobileDemo() {
  const mobile = useIsMobile()

  return (
    <p className="text-sm">
      {mobile ? "This viewport is narrow." : "This viewport is wide."}
    </p>
  )
}

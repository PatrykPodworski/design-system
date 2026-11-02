import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"

export const meta = {
  name: "message-scroller",
  title: "Message scroller",
  description: "A chat list that can jump back to the latest message.",
  variants: [] as const,
}

const lines = [
  "The theme is one CSS file.",
  "Inter is the default font.",
  "Cutive is for display text.",
  "Primary is yellow, and it marks one action.",
  "Dark mode switches the tokens, not the markup.",
]

export function Example() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="h-48 w-full max-w-sm rounded-xl border">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {lines.map((line) => (
              <MessageScrollerItem key={line}>
                <p className="text-sm">{line}</p>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}

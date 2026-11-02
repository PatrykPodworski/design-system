import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@workspace/ui/components/bubble"

export const meta = {
  name: "bubble",
  title: "Bubble",
  description: "A chat bubble, incoming or outgoing.",
  variants: ["default", "secondary", "muted", "outline"],
}

export function Example() {
  return (
    <BubbleGroup className="w-full max-w-sm">
      <Bubble variant="secondary">
        <BubbleContent>When does the release ship?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>v0.3.0 is out.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>The tag pins every dependency.</BubbleContent>
      </Bubble>
      <Bubble variant="outline" align="end">
        <BubbleContent>Install with that tag.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  )
}

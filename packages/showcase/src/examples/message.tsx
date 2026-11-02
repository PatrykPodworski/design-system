import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@workspace/ui/components/message"

export const meta = {
  name: "message",
  title: "Message",
  description: "One turn in a conversation, with an avatar and a bubble.",
  variants: ["start", "end"],
}

export function Example() {
  return (
    <MessageGroup className="w-full max-w-sm">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Ada</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>Which font is for titles?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Design system</MessageHeader>
          <Bubble>
            <BubbleContent>Cutive, at text-2xl and larger.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@workspace/ui/components/avatar"

export const meta = {
  name: "avatar",
  title: "Avatar",
  description: "A person, shown as initials when there is no image.",
  variants: [] as const,
}

export function Example() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>DS</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}

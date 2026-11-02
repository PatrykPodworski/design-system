import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command"

export const meta = {
  name: "command",
  title: "Command",
  description: "Search commands and jump to one.",
  variants: [] as const,
}

export function Example() {
  return (
    <Command className="w-full max-w-sm rounded-2xl border">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem>Theme</CommandItem>
          <CommandItem>Components</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

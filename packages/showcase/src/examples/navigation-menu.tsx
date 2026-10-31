import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu"

export const meta = {
  name: "navigation-menu",
  title: "Navigation menu",
  description: "A row of links, some of which open a panel.",
  variants: [] as const,
}

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/getting-started">Start</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Theme</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/theme">
              Colors and type
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuPositioner />
    </NavigationMenu>
  )
}

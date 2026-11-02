import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export const meta = {
  name: "sidebar",
  title: "Sidebar",
  description: "App navigation that collapses to a sheet on a narrow screen.",
  variants: [] as const,
}

export function Example() {
  return (
    <SidebarProvider className="h-72 min-h-72 w-full max-w-3xl overflow-hidden rounded-xl border">
      <Sidebar collapsible="none">
        <SidebarHeader>
          <p className="ps-2 pe-2 text-sm font-medium">Design system</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>Home</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Theme</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 p-4">
          <SidebarTrigger />
          <p className="text-sm">Page content</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

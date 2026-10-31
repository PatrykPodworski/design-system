import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

export const meta = {
  name: "tabs",
  title: "Tabs",
  description: "Switch between a few panels in the same place.",
  variants: [] as const,
}

export function Example() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-2 text-sm">
        Account settings.
      </TabsContent>
      <TabsContent value="password" className="p-2 text-sm">
        Password settings.
      </TabsContent>
    </Tabs>
  )
}

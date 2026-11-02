"use client"

import * as React from "react"
import { BellIcon, InfoIcon, MoreHorizontalIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { Kbd } from "@workspace/ui/components/kbd"
import { Label } from "@workspace/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Progress } from "@workspace/ui/components/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Slider } from "@workspace/ui/components/slider"
import { Spinner } from "@workspace/ui/components/spinner"
import { Switch } from "@workspace/ui/components/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Textarea } from "@workspace/ui/components/textarea"
import { Toaster, toast } from "@workspace/ui/components/toast"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
]

const invoices = [
  { id: "INV-001", status: "Paid", amount: "$250.00" },
  { id: "INV-002", status: "Pending", amount: "$150.00" },
  { id: "INV-003", status: "Unpaid", amount: "$350.00" },
]

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </section>
  )
}

/** Renders a sample of the design system's components. Used by every reference app. */
export function Showcase({
  framework,
  embedded = false,
}: {
  framework: string
  embedded?: boolean
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const Root = embedded ? "div" : "main"

  return (
    <TooltipProvider>
      <Toaster>
        <Root className="mx-auto flex max-w-5xl flex-col gap-10 p-6 md:p-10">
          <header className="flex flex-col gap-2">
            <h1 className="font-heading text-3xl font-semibold">
              Design system
            </h1>
            <p className="text-muted-foreground">
              Reference app: {framework}. Press <Kbd>d</Kbd> to toggle dark
              mode.
            </p>
          </header>

          <Section title="Typography">
            <div className="flex flex-col gap-2">
              <p className="font-serif text-3xl">Cutive for display text</p>
              <p>Inter for body text, labels and controls.</p>
            </div>
          </Section>

          <Section title="Buttons">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button size="icon" aria-label="Notifications">
              <BellIcon />
            </Button>
          </Section>

          <Section title="Badges and avatars">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Avatar>
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <Spinner />
          </Section>

          <Section title="Alert">
            <Alert className="max-w-lg">
              <InfoIcon />
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>
                Theme tokens come from one globals.css shared by all apps.
              </AlertDescription>
            </Alert>
          </Section>

          <Section title="Form controls">
            <div className="grid w-full max-w-sm gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type a message" />
              </div>
              <Select items={fruits}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pick a fruit" />
                </SelectTrigger>
                <SelectContent>
                  {fruits.map((fruit) => (
                    <SelectItem key={fruit.value} value={fruit.value}>
                      {fruit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">Notifications</Label>
              </div>
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="comfortable" id="r1" />
                  <Label htmlFor="r1">Comfortable</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="compact" id="r2" />
                  <Label htmlFor="r2">Compact</Label>
                </div>
              </RadioGroup>
              <Slider defaultValue={[40]} max={100} />
              <Progress value={60} />
              <ToggleGroup defaultValue={["bold"]}>
                <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border"
            />
          </Section>

          <Section title="Overlays">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Change your profile details here.
                  </DialogDescription>
                </DialogHeader>
                <Input placeholder="Display name" />
                <DialogFooter>
                  <Button>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Alert dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete the project?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Settings</SheetTitle>
                  <SheetDescription>A panel from the side.</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>Set the layer size.</PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Tooltip
              </TooltipTrigger>
              <TooltipContent>Tooltip text</TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="icon" />}
                aria-label="More"
              >
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              onClick={() =>
                toast.add({
                  title: "Saved",
                  description: "Your changes were saved.",
                })
              }
            >
              Toast
            </Button>
          </Section>

          <Section title="Card, tabs and accordion">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>Card description</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Action</Button>
              </CardFooter>
            </Card>
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
            <Accordion className="w-full max-w-sm">
              <AccordionItem value="one">
                <AccordionTrigger>
                  Which frameworks are supported?
                </AccordionTrigger>
                <AccordionContent>Vite, Next.js and Astro.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="two">
                <AccordionTrigger>Where does the theme live?</AccordionTrigger>
                <AccordionContent>
                  packages/ui/src/styles/globals.css
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          <Separator />

          <Section title="Table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell className="text-right">
                      {invoice.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Section>
        </Root>
      </Toaster>
    </TooltipProvider>
  )
}

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export const meta = {
  name: "card",
  title: "Card",
  description: "A bordered group of related content.",
  variants: [] as const,
}

export function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Release v0.3.0</CardTitle>
        <CardDescription>Inter for text, Cutive for display.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Pin the tag so every dependency comes from the same release.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Install the theme</Button>
      </CardFooter>
    </Card>
  )
}

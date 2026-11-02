import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

export const meta = {
  name: "accordion",
  title: "Accordion",
  description: "Expand and collapse a set of sections.",
  variants: [] as const,
}

export function Example() {
  return (
    <Accordion className="w-full max-w-sm">
      <AccordionItem value="frameworks">
        <AccordionTrigger>Which frameworks are supported?</AccordionTrigger>
        <AccordionContent>Vite, Next.js and Astro.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="theme">
        <AccordionTrigger>Where does the theme live?</AccordionTrigger>
        <AccordionContent>
          One globals.css shared by every app.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

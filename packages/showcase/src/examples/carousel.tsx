import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"

export const meta = {
  name: "carousel",
  title: "Carousel",
  description: "A row of slides with previous and next controls.",
  variants: [] as const,
}

const slides = ["Tokens", "Type", "Components"]

export function Example() {
  return (
    <div className="w-full max-w-xs ps-12 pe-12">
      <Carousel>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide}>
              <div className="flex h-32 items-center justify-center rounded-xl border text-sm">
                {slide}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

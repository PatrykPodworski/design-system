import registryJson from "../../../registry.json"

export type RegistryItem = {
  name: string
  type: string
  title?: string
  description?: string
}

export const registryItems = (registryJson as { items: RegistryItem[] }).items

const notes: Record<string, { title: string; description: string }> = {
  "use-mobile": {
    title: "useMobile",
    description: "Reports whether the viewport is narrower than 768px.",
  },
  "use-highlighted-code": {
    title: "useHighlightedCode",
    description:
      "Highlights source as it arrives, one complete line at a time.",
  },
  highlighter: {
    title: "Highlighter",
    description:
      "Loads Shiki for useHighlightedCode. It is not a visual component.",
  },
}

export function itemCopy(
  item: RegistryItem,
  example?: { title: string; description: string }
) {
  if (example) {
    return { title: example.title, description: example.description }
  }

  if (item.title && item.description) {
    return { title: item.title, description: item.description }
  }

  return notes[item.name] ?? { title: item.name, description: "" }
}

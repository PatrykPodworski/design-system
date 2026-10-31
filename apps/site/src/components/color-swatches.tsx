import { useSyncExternalStore } from "react"

const tokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]

const empty: Record<string, string> = {}
let cache: { signature: string; values: Record<string, string> } | null = null

function readTokens() {
  const style = getComputedStyle(document.documentElement)
  const values: Record<string, string> = {}
  for (const token of tokens) {
    values[token] = style.getPropertyValue(`--${token}`).trim()
  }
  return values
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getSnapshot() {
  const signature = document.documentElement.className
  if (cache?.signature === signature) {
    return cache.values
  }
  const values = readTokens()
  cache = { signature, values }
  return values
}

function getServerSnapshot() {
  return empty
}

export function ColorSwatches() {
  const values = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div className="swatches">
      {tokens.map((token) => (
        <div className="swatch" key={token}>
          <div
            className="swatch-color"
            style={{ background: `var(--${token})` }}
          />
          <span className="token-name">{token}</span>
          <span className="token-value">{values[token]}</span>
        </div>
      ))}
    </div>
  )
}

import { useHighlightedCode } from "@workspace/ui/hooks/use-highlighted-code"

const source = 'const font = "Cutive"\n'
const plainLines = source.replace(/\n$/, "").split("\n")

export function HighlightDemo() {
  const lines = useHighlightedCode(source, "typescript")

  return (
    <pre className="overflow-x-auto text-sm">
      {lines.map((line, index) => (
        <div key={plainLines[index] ?? "line"}>{line}</div>
      ))}
    </pre>
  )
}

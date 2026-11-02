import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@workspace/ui/components/code-block"

const source =
  "pnpm dlx shadcn@latest add PatrykPodworski/design-system/button#v0.3.0"

export const meta = {
  name: "code-block",
  title: "Code block",
  description: "A block of code with a title and a copy button.",
  variants: ["default", "destructive"],
}

export function Example() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>Install</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={source} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent>
          <CodeBlockLine>{source}</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
      <CodeBlock variant="destructive">
        <CodeBlockHeader>
          <CodeBlockTitle>Error</CodeBlockTitle>
        </CodeBlockHeader>
        <CodeBlockContent>
          <CodeBlockLine variant="removed">install failed</CodeBlockLine>
        </CodeBlockContent>
      </CodeBlock>
    </div>
  )
}

import { lazy, Suspense, type ComponentType } from "react"

type ExampleModule = {
  Example: ComponentType
}

const loaders = import.meta.glob(
  "../../../../packages/showcase/src/examples/*.tsx"
) as Record<string, () => Promise<ExampleModule>>

const examples = Object.fromEntries(
  Object.entries(loaders).map(([path, load]) => {
    const name =
      path
        .split("/")
        .pop()
        ?.replace(/\.tsx$/, "") ?? ""
    return [
      name,
      lazy(async () => {
        const mod = await load()
        return { default: mod.Example }
      }),
    ]
  })
)

type ComponentDemoProps = {
  name: string
}

export function ComponentDemo({ name }: ComponentDemoProps) {
  const Example = examples[name]
  if (!Example) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <Example />
    </Suspense>
  )
}

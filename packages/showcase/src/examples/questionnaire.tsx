import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireTitle,
} from "@workspace/ui/components/questionnaire"

export const meta = {
  name: "questionnaire",
  title: "Questionnaire",
  description: "A short sequence of questions, one step at a time.",
  variants: [] as const,
}

export function Example() {
  return (
    <Questionnaire className="w-full max-w-sm">
      <QuestionnaireItem name="font">
        <QuestionnaireTitle>Which font is for display text?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="cutive">Cutive</QuestionnaireChoice>
          <QuestionnaireChoice value="inter">Inter</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireNext />
      </QuestionnaireActions>
    </Questionnaire>
  )
}

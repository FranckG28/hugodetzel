import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { FC } from 'react'
import { QuestionsPayload } from 'types'

type Props = {
  questions: QuestionsPayload
}

export const QuestionsSection: FC<Props> = ({ questions }) => {
  return (
    <Container className="flex flex-col gap-10 lg:gap-16 py-12 lg:py-20">
      <div className="flex flex-col gap-2 md:gap-4">
        <h2>{questions.title}</h2>
        <p className="max-w-prose text-slate-200 sm:text-lg lg:text-xl text-balance">
          {questions.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-16">
        {questions.questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h5>{question.question}</h5>
            <CustomPortableText
              className="!text-base text-slate-300"
              value={question.answer}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

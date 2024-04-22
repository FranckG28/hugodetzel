import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { FC } from 'react'
import { QuestionsPayload } from 'types'

type Props = {
  questions: QuestionsPayload
}

export const QuestionsSection: FC<Props> = ({ questions }) => {
  return (
    <Container className="flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-4">
        <h2>{questions.title}</h2>
        <p className="font-serif max-w-prose text-slate-300 text-lg lg:text-xl text-balance">
          {questions.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
        {questions.questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h5>{question.question}</h5>
            <CustomPortableText
              className="!text-base"
              value={question.answer}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}
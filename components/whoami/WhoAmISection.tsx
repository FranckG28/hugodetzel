import { Container } from 'components/shared/Container'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Person } from 'components/shared/Person'
import { FC } from 'react'
import { WhoAmI } from 'types'

type Props = {
  whoAmI: WhoAmI
}

export const WhoAmISection: FC<Props> = ({ whoAmI }) => {
  return (
    <div className="bg-slate-50 text-slate-900 py-16 lg:py-20">
      <Container className="grid lg:grid-cols-3 max-lg:divide-y-2 lg:divide-x-2 divide-slate-200">
        <div className="flex flex-col gap-6 lg:gap-12 lg:col-span-2 lg:pr-12 max-lg:pb-8">
          <div className="flex flex-col gap-4">
            <CustomPortableText
              className="text-slate-800 text-lg"
              value={whoAmI.body}
            />
          </div>
          <Person
            name={whoAmI.name}
            role={whoAmI.job}
            image={whoAmI.avatar}
            avatarSide="right"
          />
        </div>
        <div className="flex flex-col gap-8 lg:gap-10 justify-between lg:pl-12 max-lg:pt-8 lg:py-4">
          {whoAmI.stats.map((stat) => {
            return (
              <div key={stat.title} className="flex flex-col gap-2">
                <p className="text-3xl font-bold text-slate-950">
                  {stat.value}
                </p>
                <p className="text-slate-800">{stat.title}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
}

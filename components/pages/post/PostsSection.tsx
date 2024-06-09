import { Container } from 'components/shared/Container'
import { Button } from 'components/ui/button'
import Link from 'next/link'
import { FC } from 'react'
import { Post } from 'types'

import PostsPreviews from './PostsPreviews'

type Props = {
  posts: Post[]
}

export const PostsSection: FC<Props> = ({ posts }) => {
  return (
    <section>
      <Container className="flex flex-col gap-12 md:gap-16 py-16 lg:py-24">
        <div className="flex flex-col gap-6 items-center text-center">
          <h2>Découvrez mes articles</h2>
          <p className="text-lg">
            Progressez par vous-même à travers les conseils que je vous partage
            gentillement.
          </p>
          <Button variant="outline" asChild>
            <Link href={`/posts`}>Voir tous mes articles</Link>
          </Button>
        </div>
        <PostsPreviews posts={posts} />
      </Container>
    </section>
  )
}

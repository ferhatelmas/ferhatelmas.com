import type { Blog, Snippet } from '~/.contentlayer/generated'
import { ProfileCard } from '~/components/cards/profile'
import { Container } from '~/components/ui/container'
import { Twemoji } from '~/components/ui/twemoji'
import type { CoreContent } from '~/types/data'
import { Greeting } from './greeting'
import { Intro } from './intro'
import { LatestPosts } from './latest-posts'
import { BlogLinks } from './links'
import { TypedBios } from './typed-bios'

export function Home({
  posts,
  snippets,
}: {
  posts: CoreContent<Blog>[]
  snippets: CoreContent<Snippet>[]
}) {
  return (
    <Container as="div" className="space-y-6 pt-4 md:space-y-24 lg:pt-12">
      <div className="pt-6 xl:grid xl:grid-cols-3">
        <div className="space-y-4 md:space-y-6 md:pr-8 xl:col-span-2">
          <Greeting />
          <div className="text-base leading-7 text-gray-600 md:text-lg md:leading-8 dark:text-gray-400">
            <Intro />
            <TypedBios />
            <div className="mt-4 mb-6 md:mb-8">
              <p>
                This blog is to have a common place to document and to share my
                interest, knowledge & experience.
              </p>
            </div>
            <BlogLinks />
            <p className="my-6 flex md:my-8">
              <span className="mr-2">Happy reading</span>
              <Twemoji emoji="clinking-beer-mugs" />
            </p>
          </div>
        </div>
        <div className="hidden pt-8 pl-4 xl:block">
          <ProfileCard />
        </div>
      </div>
      <LatestPosts posts={posts} snippets={snippets} />
    </Container>
  )
}

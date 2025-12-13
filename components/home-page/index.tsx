import type { Blog, Snippet } from '~/.contentlayer/generated'
import { Container } from '~/components/ui/container'
import type { CoreContent } from '~/types/data'
import { LatestPosts } from './latest-posts'

export function Home({
  posts,
  snippets,
}: {
  posts: CoreContent<Blog>[]
  snippets: CoreContent<Snippet>[]
}) {
  return (
    <Container as="div" className="space-y-6 pt-4 md:space-y-24 lg:pt-12">
      <LatestPosts posts={posts} snippets={snippets} />
    </Container>
  )
}

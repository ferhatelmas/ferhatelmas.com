import { clsx } from 'clsx'
import type { Blog } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { Banner } from '~/components/blog/banner'
import { BlogMeta } from '~/components/blog/blog-meta'
import { DiscussOnX } from '~/components/blog/discuss-on-x'
import { EditOnGithub } from '~/components/blog/edit-on-github'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { SocialShare } from '~/components/blog/social-share'
import { TagsList } from '~/components/blog/tags'
import { Container } from '~/components/ui/container'
import { SITE_METADATA } from '~/data/site-metadata'
import type { CoreContent } from '~/types/data'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostBanner({ content, children }: LayoutProps) {
  let {
    slug,
    type,
    title,
    images,
    date,
    lastmod,
    readingTime,
    tags,
    filePath,
  } = content
  let postUrl = `${SITE_METADATA.siteUrl}/${type.toLowerCase()}/${slug}`

  return (
    <Container className="pt-4 lg:pt-12">
      <ScrollButtons />
      <article className="space-y-6 pt-6 lg:space-y-16">
        <div className="space-y-4">
          <TagsList tags={tags} />
          <PostTitle>{title}</PostTitle>
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <BlogMeta
                date={date}
                lastmod={lastmod}
                slug={slug}
                readingTime={readingTime}
              />
            </div>
          </dl>
          <div className="space-y-4 pt-4 md:pt-10">
            <Banner
              banner={images?.[0] || SITE_METADATA.socialBanner}
              className="lg:-mx-8 xl:-mx-36 2xl:-mx-52"
            />
          </div>
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>
        <div className="space-y-8 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <DiscussOnX postUrl={postUrl} />
              <span className="text-gray-500">/</span>
              <EditOnGithub filePath={filePath} />
            </div>
            {/* <SocialShare postUrl={postUrl} title={title} /> */}
          </div>
        </div>
      </article>
    </Container>
  )
}

function Credit({ image, className }: { image: string; className?: string }) {
  let [, author, id] = image.split('__')
  if (author && id) {
    return (
      <div className={clsx('text-right text-sm italic', className)}>
        Photo by{' '}
        <a
          className="text-primary-500 dark:text-primary-400 underline-offset-4 hover:underline"
          href={`https://unsplash.com/@${author}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>@{author}</span>
        </a>{' '}
        on{' '}
        <a
          className="text-primary-500 dark:text-primary-400 underline-offset-4 hover:underline"
          href={`https://unsplash.com/photos/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <span>Unsplash</span>
        </a>
      </div>
    )
  }
  return null
}

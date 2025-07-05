import type { Author } from 'contentlayer/generated'
import type { ReactNode } from 'react'
import { SocialAccounts } from '~/components/author/social-accounts'
import { ProfileCard } from '~/components/cards/profile'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Image } from '~/components/ui/image'
import { PageHeader } from '~/components/ui/page-header'
import { Twemoji } from '~/components/ui/twemoji'
import { Link } from '~/components/ui/link'
import { SITE_METADATA } from '~/data/site-metadata'

interface Props {
  children?: ReactNode
  content: Omit<Author, '_id' | '_raw' | 'body'>
}

export function AuthorLayout({ children }: Props) {
  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="About"
        description="A bit of background on who I am and what I do."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-8 md:grid md:grid-cols-3">
        <div className="pr-4">
          <ProfileCard />
        </div>
        <div className="md:col-span-2 md:pl-12 xl:pl-16">
          <div className="prose prose-lg dark:prose-invert">
            <div>
              <div className="mt-0 flex items-center justify-between [&>h2]:my-0">
                <h2>
                  <Twemoji emoji="waving-hand" />
                  Hi there
                </h2>
                <Button as="a" href={`${SITE_METADATA.resume}`} target="_blank">
                  <span style={{ color: 'white' }}>Resume</span>
                  <Twemoji emoji="page-facing-up" />
                </Button>
              </div>
              <p>
                I'm a software engineer living in the beautiful city of{' '}
                <strong>Amsterdam, Netherlands</strong>. I'm strongly interested
                in distributed systems, databases and storage systems and have
                over ten years of experience in the industry with{' '}
                <strong>Go</strong> and <strong>Rust</strong> ecosystems.
                Currently, I work as a Senior Software Engineer at{' '}
                <strong>Cloudflare</strong> on the Workers Storage department,
                primarily on <strong>KV</strong> and <strong>R2</strong>. I'm an
                avid reader and enjoy exploring more or less any genre such as{' '}
                <strong>history</strong>, <strong>business</strong>,{' '}
                <strong>economics</strong>, <strong>psychology</strong>, and{' '}
                <strong>science fiction</strong>. You can find a huge{' '}
                <Link href={`${SITE_METADATA.goodreads}`}>collection</Link> of
                my book reviews <Link href="/tags/book-review">here</Link>. I
                also love running and I am regularly in the{' '}
                <Link href={`${SITE_METADATA.strava}`}>field</Link>.
              </p>
              <p>
                This website serves as a central repository for documenting and
                sharing the thoughts, insights, and knowledge I've accumulated.
              </p>
              <p>
                I would greatly appreciate any comments and feedback on my posts{' '}
                <Twemoji emoji="clinking-beer-mugs" />.
              </p>
            </div>
            <div>
              <h2>Tech stack</h2>
              <p>
                This website is hosted on{' '}
                <a
                  href="https://cloudflare.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cloudflare
                </a>
                , built with{' '}
                <a
                  href="https://opennextjs.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Next.js
                </a>{' '}
                and{' '}
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tailwind CSS
                </a>{' '}
                using <strong>Tailwind Nextjs Starter Blog</strong>.
              </p>
              <p>
                A huge thanks to{' '}
                <a
                  href="https://twitter.com/timlrxx"
                  target="_blank"
                  rel="noreferrer"
                >
                  Timothy Lin
                </a>{' '}
                and{' '}
                <a
                  href="https://twitter.com/hta218_"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tuan Anh (Leo) Huynh
                </a>{' '}
                for the minimal, lightweight, and super easy-to-customize blog
                starter.
              </p>
              <p>
                Main changes are made to port Next.js to Open Next.js to host on
                Cloudflare with{' '}
                <Link
                  href="https://workers.cloudflare.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  worker
                </Link>{' '}
                ecosystem while removing some dependencies and features I deem
                unnecessary in the original versions.
              </p>
              <p>
                See the{' '}
                <a
                  href="https://github.com/ferhelmas/ferhatelmas.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  source
                </a>{' '}
                if you are interested.
              </p>
            </div>
            <div>
              <h2>Assets</h2>
              <p>
                Most of the images in my blog are from{' '}
                <a
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Unsplash
                </a>
                , gifs from{' '}
                <a href="https://giphy.com/" target="_blank" rel="noreferrer">
                  GIPHY
                </a>
                , and illustrations are from{' '}
                <a
                  href="https://storyset.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Storyset
                </a>
                .
              </p>
              <p>
                Thanks for the free resources <Twemoji emoji="folded-hands" />.
              </p>
            </div>
            <div>
              <h2>Contact</h2>
              <p>
                Reach out to me at{' '}
                <a href={`mailto:${SITE_METADATA.email}`}>
                  {SITE_METADATA.email}
                </a>{' '}
                or find me on social media:
              </p>
              <SocialAccounts />
            </div>
            <div>
              <h2>Support</h2>
              <p>If you appreciate my work, consider supporting me:</p>
              <div className="flex flex-col items-start gap-4">
                <a
                  href={SITE_METADATA.support.buyMeACoffee}
                  target="_blank"
                  className="[&_.image-container]:mx-0"
                  rel="noreferrer"
                >
                  <Image
                    src="/static/images/bmc-button.png"
                    alt="Buy Me A Coffee"
                    width={213.7}
                    height={60}
                    style={{ height: 60 }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

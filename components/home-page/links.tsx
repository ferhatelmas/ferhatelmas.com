import { GrowingUnderline } from '~/components/ui/growing-underline'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'

const LINKS = [
  {
    title: 'What have I built?',
    href: '/projects',
    emoji: 'man-technologist',
  },
  {
    title: 'My writings',
    href: '/blog',
    emoji: 'memo',
  },
  {
    title: 'Snippets collection',
    href: '/snippets',
    emoji: 'dna',
  },
  {
    title: 'About me & this blog',
    href: '/about',
    emoji: 'smiling-face-with-sunglasses',
  },
]

export function BlogLinks() {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      {LINKS.map(({ title, href, emoji }) => (
        <Link key={title} href={href} className="flex items-center gap-1.5">
          <Twemoji emoji={emoji} />
          <GrowingUnderline className="leading-6">{title}</GrowingUnderline>
        </Link>
      ))}
    </div>
  )
}

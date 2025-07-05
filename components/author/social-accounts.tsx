import { clsx } from 'clsx'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE_METADATA } from '~/data/site-metadata'

export function SocialAccounts({ className }: { className?: string }) {
  return (
    <div className={clsx('flex items-center space-x-4', className)}>
      <a
        href={SITE_METADATA.github}
        target="_blank"
        className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900! dark:text-gray-100!"
        rel="noopener noreferrer"
      >
        <span className="sr-only">Github</span>
        <Github strokeWidth={1.5} />
      </a>
      <a
        href={SITE_METADATA.linkedin}
        target="_blank"
        className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900! dark:text-gray-100!"
        rel="noopener noreferrer"
      >
        <span className="sr-only">Linkedin</span>
        <Linkedin strokeWidth={1.5} />
      </a>
      <a
        href={`mailto:${SITE_METADATA.email}`}
        target="_self"
        className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900! dark:text-gray-100!"
        rel="noopener noreferrer"
      >
        <span className="sr-only">Mail</span>
        <Mail strokeWidth={1.5} />
      </a>
    </div>
  )
}

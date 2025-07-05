'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '~/components/ui/twemoji'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  let el = useRef(null)
  let typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current?.destroy()
      typed.current = createTypedInstance(el.current)
    }
  }, [])

  return (
    <div
      className={clsx([
        'flex min-h-8 items-center gap-0.5',
        [
          '[&_.typed-cursor]:inline-block',
          '[&_.typed-cursor]:w-2',
          '[&_.typed-cursor]:h-5.5',
          '[&_.typed-cursor]:text-transparent',
          '[&_.typed-cursor]:bg-slate-800',
          'dark:[&_.typed-cursor]:bg-slate-100',
        ],
      ])}
    >
      <ul id="bios" className="hidden">
        <li>
          I am from Bursa, Turkey <Twemoji emoji="flag-turkey" />
        </li>
        <li>
          I live in Amsterdam, Netherlands <Twemoji emoji="flag-netherlands" />
        </li>
        <li>I'm a learner, builder and exponential compounder.</li>
        <li>I focus on distributed storage systems.</li>
        <li>I pick the language according to the task.</li>
        <li>I mostly work with Rust, Go, Python and JS/TS.</li>
        <li>
          I love reading <Twemoji emoji="books" /> and running
          <Twemoji emoji="man-running" />
        </li>
        <li>I love downtempo electronic music.</li>
        <li>
          I love playing chess. <Twemoji emoji="chess-pawn" />
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}

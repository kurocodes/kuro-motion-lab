import { Github, Linkedin, Moon, Sun, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

const socialLinks = [
  { href: 'https://github.com/kurocodes', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/deepak-vaishnav-541199375/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/kurocodes/', label: 'Twitter', icon: Twitter },
]

export function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const ThemeIcon = isDark ? Sun : Moon

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border) bg-(--color-nav)/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          to="/"
          className="text-sm font-semibold tracking-[0.14em] text-(--color-text) transition-opacity duration-200 hover:opacity-70"
        >
          Home
        </Link>

        <div className="flex items-center gap-2">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-(--color-muted) transition-all duration-200 hover:border-(--color-border-strong) hover:bg-(--color-surface-strong) hover:text-(--color-text)"
            >
              <Icon size={18} strokeWidth={1.9} />
            </a>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-text) shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-border-strong) hover:bg-(--color-surface-strong)"
          >
            <ThemeIcon size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  )
}

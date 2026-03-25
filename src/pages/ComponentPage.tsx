import { Suspense, useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ComponentSandbox } from '../components/ui/ComponentSandbox'
import { LoadingProgress } from '../components/ui/LoadingProgress'
import { getComponentBySlug } from '../data/componentsData'

export default function ComponentPage() {
  const { componentSlug } = useParams()
  const component = getComponentBySlug(componentSlug)
  const [isSmallOrTouchDevice, setIsSmallOrTouchDevice] = useState(false)

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(hover: none)'),
      window.matchMedia('(pointer: coarse)'),
    ]

    const updateDeviceState = () => {
      setIsSmallOrTouchDevice(mediaQueries.some((query) => query.matches))
    }

    updateDeviceState()

    mediaQueries.forEach((query) => {
      query.addEventListener('change', updateDeviceState)
    })

    return () => {
      mediaQueries.forEach((query) => {
        query.removeEventListener('change', updateDeviceState)
      })
    }
  }, [])

  if (!component) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <div className="rounded-4xl border border-(--color-border) bg-(--color-surface) p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-(--color-muted)">
            Not found
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-(--color-text)">
            That component does not exist.
          </h1>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface-strong) px-4 py-2 text-sm font-medium text-(--color-text) transition-colors duration-200 hover:border-(--color-border-strong)"
          >
            <ArrowLeft size={16} />
            Back home
          </Link>
        </div>
      </div>
    )
  }

  const PreviewComponent = component.component
  const showDesktopOnlyOverlay =
    component.supportsTouch === false && isSmallOrTouchDevice
  const interactionBadges =
    component.supportsTouch === false
      ? [
          'Desktop Only',
          ...(component.tags.includes('Hover') ? ['Hover Interaction'] : []),
          ...(component.tags.includes('Cursor') ? ['Cursor-based'] : []),
        ]
      : []

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-(--color-muted) transition-colors duration-200 hover:text-(--color-text)"
      >
        <ArrowLeft size={16} />
        Back to components
      </Link>

      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-muted)">
          Component Preview
        </p>
        
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-(--color-text)">
          {component.name}
        </h1>
        <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-7 text-(--color-muted)">
          {component.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-muted)"
            >
              {tag}
            </span>
          ))}
        </div>

        {component.githubUrl && <div className="mt-6">
          <a
            href={component.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm font-medium text-(--color-text) transition-colors duration-200 hover:border-(--color-border-strong) hover:bg-(--color-surface-strong)"
          >
            <Github size={16} />
            View GitHub repo
            <ArrowUpRight size={16} />
          </a>
        </div>}
      </section>

      <section className="mt-10">
        <div className="relative">
          <ComponentSandbox>
            <div
              className={`transition duration-300 ${
                showDesktopOnlyOverlay
                  ? 'pointer-events-none select-none opacity-30 blur-[1.5px]'
                  : ''
              }`}
              aria-hidden={showDesktopOnlyOverlay}
            >
              <Suspense
                fallback={
                  <div className="flex min-h-64 items-center justify-center rounded-3xl bg-(--color-surface) text-sm text-(--color-muted)">
                    <LoadingProgress
                      label="Loading component..."
                      compact
                      className="max-w-xs"
                    />
                  </div>
                }
              >
                <PreviewComponent />
              </Suspense>
            </div>
          </ComponentSandbox>

          {showDesktopOnlyOverlay && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-5 sm:p-8">
              <div className="max-w-sm rounded-3xl border border-(--color-border-strong) bg-(--color-surface)/95 px-5 py-4 text-center shadow-lg backdrop-blur-sm">
                <div className="mb-3 flex flex-wrap justify-center gap-2">
                  {interactionBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-(--color-border) bg-(--color-surface-strong) px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-muted)"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-6 text-(--color-text)">
                  This interaction uses hover or cursor tracking.
                  <br />
                  Try it on desktop for full experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

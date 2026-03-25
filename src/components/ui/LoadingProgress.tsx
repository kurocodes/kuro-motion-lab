import { useEffect, useState } from 'react'

type LoadingProgressProps = {
  label: string
  className?: string
  compact?: boolean
}

export function LoadingProgress({
  label,
  className,
  compact = false,
}: LoadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const durationMs = 1400
    const intervalMs = 40
    const totalSteps = durationMs / intervalMs
    let currentStep = 0

    const timer = window.setInterval(() => {
      currentStep += 1
      const nextProgress = Math.min(
        100,
        Math.round((currentStep / totalSteps) * 100),
      )

      setProgress(nextProgress)

      if (nextProgress >= 100) {
        window.clearInterval(timer)
      }
    }, intervalMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div
      className={`rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-sm ${
        compact ? 'w-full max-w-sm p-5' : 'w-full max-w-md p-6'
      } ${className ?? ''}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-(--color-text)">{label}</p>
        <span className="text-sm font-semibold tabular-nums text-(--color-muted)">
          {progress}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-(--color-surface-strong)">
        <div
          className="h-full rounded-full bg-(--color-text) transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { ThemeContext, type Theme } from '../context/ThemeContext'

const STORAGE_KEY = 'kuro-motion-lab-theme'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [resolvedTheme, setResolvedTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return storedTheme === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    applyTheme(resolvedTheme)
    window.localStorage.setItem(STORAGE_KEY, resolvedTheme)
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      resolvedTheme,
      toggleTheme: () => {
        setResolvedTheme((currentTheme) =>
          currentTheme === 'light' ? 'dark' : 'light',
        )
      },
    }),
    [resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

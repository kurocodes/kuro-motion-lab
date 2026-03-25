import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { LoadingProgress } from './components/ui/LoadingProgress'

const HomePage = lazy(() => import('./pages/HomePage'))
const ComponentPage = lazy(() => import('./pages/ComponentPage'))

function App() {
  return (
    <AppShell>
      <Suspense
        fallback={
          <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-6 py-16">
            <LoadingProgress label="Loading playground..." />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:componentSlug" element={<ComponentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

export default App

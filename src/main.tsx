import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import AuthProvider from './context/AuthProvider.tsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/index.ts'
import AuthProvider from './providers/AuthProviders.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
export const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <ThemeProvider defaultTheme="light" storageKey="ui-theme"> */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
    {/* </ThemeProvider> */}
  </StrictMode>,
)

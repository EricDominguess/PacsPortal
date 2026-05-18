import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CompleteRegPage } from './pages/completeRegPage/completeRegPage.tsx'
import { TenantThemeProvider } from './theme/tenantTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TenantThemeProvider>
      <CompleteRegPage />
    </TenantThemeProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CompleteRegPage } from './pages/completeRegPage/completeRegPage.tsx'
import { LoginPage } from './pages/loginPage/loginPage.tsx'
import { RegisterPage } from './pages/registerPage/registerPage.tsx'
import { ForgotPassPage } from './pages/forgotPassPage/forgotPassPage.tsx'
import { HomePage } from './pages/homePage/homePage.tsx'
import { MainPage } from './pages/mainPage/mainPage.tsx'
import { TenantThemeProvider } from './theme/tenantTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TenantThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CompleteRegPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </TenantThemeProvider>
  </StrictMode>,
)

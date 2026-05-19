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
import { PortalTenantProvider } from './tenants/PortalTenantContext'
import { PortalLoginPage } from './pages/portal/loginPage/portalLoginPage'
import { DashboardPage } from './pages/portal/dashboardPage/dashboardPage'
import { ExamsPage } from './pages/portal/examsPage/examsPage'
import { ExamDetailPage } from './pages/portal/examDetailPage/examDetailPage'
import { ComingSoonPage } from './pages/portal/comingSoonPage/comingSoonPage'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TenantThemeProvider>
            <PortalTenantProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<CompleteRegPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPassPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/main" element={<MainPage />} />

                        {/* Portal do Paciente */}
                        <Route path="/portal" element={<PortalLoginPage />} />
                        <Route path="/portal/login" element={<PortalLoginPage />} />
                        <Route path="/portal/home" element={<DashboardPage />} />
                        <Route path="/portal/exames" element={<ExamsPage />} />
                        <Route path="/portal/exames/:id" element={<ExamDetailPage />} />
                        <Route path="/portal/consultas" element={<ComingSoonPage screen="consultas" />} />
                        <Route path="/portal/agendar" element={<ComingSoonPage screen="agendar" />} />
                        <Route path="/portal/documentos" element={<ComingSoonPage screen="documentos" />} />
                        <Route path="/portal/perfil" element={<ComingSoonPage screen="perfil" />} />
                    </Routes>
                </Router>
            </PortalTenantProvider>
        </TenantThemeProvider>
    </StrictMode>,
)

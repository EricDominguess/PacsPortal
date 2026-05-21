import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortalTenantProvider } from './tenants/PortalTenantContext'
import { PortalLoginPage } from './pages/portal/loginPage/portalLoginPage'
import { DashboardPage } from './pages/portal/dashboardPage/dashboardPage'
import { ExamsPage } from './pages/portal/examsPage/examsPage'
import { ExamDetailPage } from './pages/portal/examDetailPage/examDetailPage'
import { ComingSoonPage } from './pages/portal/comingSoonPage/comingSoonPage'
import { PortalRegisterPage } from './pages/portal/registerPage/registerPage'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PortalTenantProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PortalLoginPage />} />
                    <Route path="/login" element={<PortalLoginPage />} />
                    <Route path="/home" element={<DashboardPage />} />
                    <Route path="/exames" element={<ExamsPage />} />
                    <Route path="/exames/:id" element={<ExamDetailPage />} />
                    <Route path="/consultas" element={<ComingSoonPage screen="consultas" />} />
                    <Route path="/agendar" element={<ComingSoonPage screen="agendar" />} />
                    <Route path="/documentos" element={<ComingSoonPage screen="documentos" />} />
                    <Route path="/perfil" element={<ComingSoonPage screen="perfil" />} />
                    <Route path="/register" element={<PortalRegisterPage />} />
                </Routes>
            </Router>
        </PortalTenantProvider>
    </StrictMode>,
)

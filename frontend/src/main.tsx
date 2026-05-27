import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RequireAdmin } from './context/AuthContext'
import { PortalLoginPage } from './pages/portal/loginPage/portalLoginPage'
import { HomePage } from './pages/portal/homePage/homePage'
import { ExamDetailPage } from './pages/portal/examDetailPage/examDetailPage'
import { ProfilePage } from './pages/portal/profilePage/profilePage'
import { AdminLayout } from './pages/admin/AdminLayout'
import { DashboardPage } from './pages/admin/DashboardPage'
import { PacientesPage } from './pages/admin/PacientesPage'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Portal do paciente */}
                    <Route path="/" element={<PortalLoginPage />} />
                    <Route path="/login" element={<PortalLoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/exames/:id" element={<ExamDetailPage />} />
                    <Route path="/perfil" element={<ProfilePage />} />

                    {/* Painel administrativo */}
                    <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                        <Route index element={<DashboardPage />} />
                        <Route path="pacientes" element={<PacientesPage />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    </StrictMode>,
)

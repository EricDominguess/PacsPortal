import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortalLoginPage } from './pages/portal/loginPage/portalLoginPage'
import { HomePage } from './pages/portal/homePage/homePage'
import { ExamDetailPage } from './pages/portal/examDetailPage/examDetailPage'
import { ProfilePage } from './pages/portal/profilePage/profilePage'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<PortalLoginPage />} />
                <Route path="/login" element={<PortalLoginPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/exames/:id" element={<ExamDetailPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
            </Routes>
        </Router>
    </StrictMode>,
)

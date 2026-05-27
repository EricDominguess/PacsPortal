import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Icon, LogoMark } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import type { IconName } from '../../types/portal';

const navItems: { path: string; label: string; icon: IconName }[] = [
    { path: '/admin', label: 'Dashboard', icon: 'home' },
    { path: '/admin/pacientes', label: 'Pacientes', icon: 'user' },
];

export function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => { logout(); navigate('/login'); };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
            {/* Sidebar */}
            <aside className="hide-on-mobile" style={{
                width: 240, background: 'var(--surface)', borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', padding: '20px 12px', gap: 4, flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px', marginBottom: 24 }}>
                    <LogoMark size={28} />
                </div>

                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: 4 }}>
                    Menu
                </div>

                {navItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <button key={item.path} onClick={() => navigate(item.path)} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: active ? 'var(--primary-soft)' : 'transparent',
                            color: active ? 'var(--primary)' : 'var(--text-2)',
                            fontWeight: 600, fontSize: 13, width: '100%', textAlign: 'left',
                            transition: 'all .12s',
                        }}
                            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                        >
                            <Icon name={item.icon} size={18} />
                            {item.label}
                        </button>
                    );
                })}

                <div style={{ flex: 1 }} />

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
                    <div style={{ padding: '4px 8px', marginBottom: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{user?.nome}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{user?.email}</div>
                    </div>
                    <button onClick={handleLogout} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: 'transparent', color: 'var(--coral)', fontWeight: 600, fontSize: 13, width: '100%',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--coral-soft)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                        <Icon name="logout" size={18} /> Sair
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Mobile topbar */}
                <div className="show-on-mobile" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', background: 'var(--surface)', borderBottom: '1px solid var(--border)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <LogoMark size={24} />
                        <span style={{ fontSize: 14, fontWeight: 700 }}>Admin</span>
                    </div>
                    <button onClick={handleLogout} style={{
                        border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-2)',
                    }}>
                        <Icon name="logout" size={18} />
                    </button>
                </div>

                <main style={{ flex: 1, padding: '24px 24px 80px', maxWidth: 1200, width: '100%', margin: '0 auto' }}>
                    <Outlet />
                </main>

                {/* Mobile nav */}
                <nav className="show-on-mobile mobile-nav">
                    {navItems.map((item) => {
                        const active = location.pathname === item.path;
                        return (
                            <button key={item.path} onClick={() => navigate(item.path)} className="mobile-nav-item"
                                aria-current={active ? 'page' : undefined}>
                                <Icon name={item.icon} size={20} />
                                <span className="mobile-nav-label">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

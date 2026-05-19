import type { ReactNode } from 'react';
import type { NotificationItem, Patient, ScreenId } from '../../types/portal';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface Props {
    children?: ReactNode;
    current: ScreenId;
    onNavigate: (id: ScreenId) => void;
    patient: Patient;
    notifications: NotificationItem[];
    onLogout: () => void;
}

export function AppShell({ children, current, onNavigate, patient, notifications, onLogout }: Props) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
            <Sidebar current={current} onNavigate={onNavigate} onLogout={onLogout} />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                <Topbar patient={patient} onNavigate={onNavigate} notifications={notifications} />
                <main style={{ flex: 1, padding: '28px 32px 56px', maxWidth: 1280, width: '100%', margin: '0 auto' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

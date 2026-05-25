import type { ReactNode } from 'react';
import type { Patient, ScreenId } from '../../types/portal';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

interface Props {
    children?: ReactNode;
    current: ScreenId;
    onNavigate: (id: ScreenId) => void;
    patient: Patient;
}

export function AppShell({ children, current, onNavigate, patient }: Props) {
    return (
        <div className="app-shell">
            <div className="app-shell-content">
                <Topbar patient={patient} onNavigate={onNavigate} />
                <main className="app-shell-main">
                    {children}
                </main>
            </div>
            <MobileNav current={current} onNavigate={onNavigate} />
        </div>
    );
}

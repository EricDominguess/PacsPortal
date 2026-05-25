import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import type { ScreenId } from '../../../types/portal';
import { PATIENT } from '../../../data/patient';

const SCREEN_PATHS: Record<ScreenId, string> = {
    login: '/login',
    home: '/home',
    perfil: '/perfil',
    'exame-detalhe': '/home',
};

interface Props {
    children?: ReactNode;
    current: ScreenId;
}

export function PortalLayout({ children, current }: Props) {
    const navigate = useNavigate();
    const onNavigate = (id: ScreenId) => navigate(SCREEN_PATHS[id]);

    return (
        <AppShell
            current={current}
            onNavigate={onNavigate}
            patient={PATIENT}
        >
            {children}
        </AppShell>
    );
}

import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import type { ScreenId } from '../../../types/portal';
import { PATIENT } from '../../../data/patient';
import { NOTIFICATIONS } from '../../../data/notifications';
import { usePortalTenant } from '../../../tenants/PortalTenantContext';
import { DemoSwitcher } from '../../../tenants/DemoSwitcher';

const SCREEN_PATHS: Record<ScreenId, string> = {
    login: '/portal/login',
    home: '/portal/home',
    exames: '/portal/exames',
    'exame-detalhe': '/portal/exames',
    consultas: '/portal/consultas',
    agendar: '/portal/agendar',
    documentos: '/portal/documentos',
    perfil: '/portal/perfil',
};

interface Props {
    children?: ReactNode;
    current: ScreenId;
}

export function PortalLayout({ children, current }: Props) {
    const navigate = useNavigate();
    const { tenantId, setTenantId } = usePortalTenant();

    const onNavigate = (id: ScreenId) => navigate(SCREEN_PATHS[id]);
    const onLogout = () => navigate('/portal/login');

    return (
        <>
            <AppShell
                current={current}
                onNavigate={onNavigate}
                onLogout={onLogout}
                patient={PATIENT}
                notifications={NOTIFICATIONS}
            >
                {children}
            </AppShell>
            <DemoSwitcher current={tenantId} onPick={setTenantId} />
        </>
    );
}

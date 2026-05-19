import { useNavigate } from 'react-router-dom';
import type { ScreenId } from '../../../types/portal';
import { Button, Icon } from '../../../components/ui';
import { PortalLayout } from '../layout/PortalLayout';

const TITLES: Partial<Record<ScreenId, string>> = {
    consultas: 'Consultas',
    agendar: 'Agendar',
    documentos: 'Documentos',
    perfil: 'Meu perfil',
};

interface Props {
    screen: ScreenId;
}

export function ComingSoonPage({ screen }: Props) {
    const navigate = useNavigate();
    const title = TITLES[screen] || screen;

    return (
        <PortalLayout current={screen}>
            <div style={{ padding: '60px 20px', display: 'grid', placeItems: 'center', textAlign: 'center', minHeight: '60vh' }}>
                <div>
                    <div style={{
                        width: 72, height: 72, margin: '0 auto 18px',
                        borderRadius: 18,
                        background: 'var(--primary-soft)', color: 'var(--primary)',
                        display: 'grid', placeItems: 'center',
                    }}>
                        <Icon name="sparkle" size={32} stroke={1.5} />
                    </div>
                    <h1 className="serif" style={{ margin: 0, fontSize: 36, letterSpacing: '-0.01em' }}>{title}</h1>
                    <p style={{ color: 'var(--text-2)', fontSize: 15, maxWidth: 400, margin: '12px auto 24px' }}>
                        Essa tela faz parte de uma próxima entrega. Estamos trabalhando para liberar em breve.
                    </p>
                    <Button variant="primary" icon="chevron-left" onClick={() => navigate('/home')}>Voltar para Início</Button>
                </div>
            </div>
        </PortalLayout>
    );
}

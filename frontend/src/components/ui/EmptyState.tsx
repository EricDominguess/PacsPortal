import type { ReactNode } from 'react';
import type { IconName } from '../../types/portal';
import { Icon } from './Icon';

interface Props {
    icon: IconName;
    title: ReactNode;
    body: ReactNode;
    action?: ReactNode;
}

export function EmptyState({ icon, title, body, action }: Props) {
    return (
        <div style={{ padding: '36px 24px', textAlign: 'center' }}>
            <div style={{
                width: 56, height: 56, margin: '0 auto 14px',
                borderRadius: 14, background: 'var(--primary-soft)', color: 'var(--primary)',
                display: 'grid', placeItems: 'center',
            }}>
                <Icon name={icon} size={26} stroke={1.5} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
            <div style={{ color: 'var(--text-3)', fontSize: 13, maxWidth: 360, margin: '0 auto 16px' }}>{body}</div>
            {action}
        </div>
    );
}

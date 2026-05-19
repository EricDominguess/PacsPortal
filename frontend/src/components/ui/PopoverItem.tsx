import type { ReactNode } from 'react';
import type { IconName } from '../../types/portal';
import { Icon } from './Icon';

interface Props {
    icon: IconName;
    children?: ReactNode;
    onClick?: () => void;
    tone?: 'coral' | 'default';
}

export function PopoverItem({ icon, children, onClick, tone }: Props) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 12px',
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: tone === 'coral' ? 'var(--coral)' : 'var(--text)',
                fontSize: 13, fontWeight: 500, textAlign: 'left',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
            <Icon name={icon} size={16} />
            {children}
        </button>
    );
}

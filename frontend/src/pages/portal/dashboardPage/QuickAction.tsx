import type { IconName, Tone } from '../../../types/portal';
import { Icon } from '../../../components/ui';

interface Props {
    icon: IconName;
    tone: Tone;
    label: string;
    onClick: () => void;
}

export function QuickAction({ icon, tone, label, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12,
                padding: '18px 18px',
                background: 'transparent', border: 'none',
                borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
                cursor: 'pointer', textAlign: 'left',
                transition: 'background .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
            <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: `var(--${tone}-soft)`, color: `var(--${tone})`,
                display: 'grid', placeItems: 'center',
            }}>
                <Icon name={icon} size={18} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{label}</div>
        </button>
    );
}

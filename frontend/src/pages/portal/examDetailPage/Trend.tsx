import type { Tone } from '../../../types/portal';
import { Icon } from '../../../components/ui';

interface Props {
    label: string;
    current: string;
    prev: string;
    tone: Tone;
}

export function Trend({ label, current, prev, tone }: Props) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dashed var(--border)' }}>
            <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{prev}</span>
                <Icon name="arrow-right" size={12} style={{ color: 'var(--text-3)' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: `var(--${tone})` }}>{current}</span>
            </div>
        </div>
    );
}

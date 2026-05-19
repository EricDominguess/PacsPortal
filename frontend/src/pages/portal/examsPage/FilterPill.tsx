import type { ReactNode } from 'react';
import type { Tone } from '../../../types/portal';

interface Props {
    active: boolean;
    onClick: () => void;
    children?: ReactNode;
    count: number;
    dot?: Tone;
}

export function FilterPill({ active, onClick, children, count, dot }: Props) {
    const dotColor = dot ? `var(--${dot})` : null;
    return (
        <button onClick={onClick} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px',
            borderRadius: 999,
            border: '1px solid',
            borderColor: active ? 'var(--primary)' : 'var(--border)',
            background: active ? 'var(--primary-soft)' : 'transparent',
            color: active ? 'var(--primary)' : 'var(--text-2)',
            fontWeight: active ? 600 : 500, fontSize: 13,
            cursor: 'pointer',
        }}>
            {dotColor && <span style={{ width: 7, height: 7, borderRadius: 999, background: dotColor }} />}
            {children}
            <span style={{
                fontSize: 11, fontWeight: 700,
                background: active ? '#fff' : 'var(--bg-subtle)',
                color: active ? 'var(--primary)' : 'var(--text-3)',
                padding: '1px 7px', borderRadius: 999,
            }}>{count}</span>
        </button>
    );
}

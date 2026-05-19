import type { ReactNode } from 'react';
import type { Tone } from '../../types/portal';

interface BadgeProps {
    tone?: Tone;
    children?: ReactNode;
    dot?: boolean;
    size?: 'sm' | 'md';
}

export function Badge({ tone = 'neutral', children, dot, size = 'md' }: BadgeProps) {
    const tones: Record<Tone, { bg: string; fg: string; dot: string }> = {
        neutral: { bg: 'var(--bg-subtle)', fg: 'var(--text-2)', dot: '#8b94a7' },
        primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)', dot: 'var(--primary)' },
        sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)', dot: 'var(--sage)' },
        amber: { bg: 'var(--amber-soft)', fg: 'var(--amber)', dot: 'var(--amber)' },
        coral: { bg: 'var(--coral-soft)', fg: 'var(--coral)', dot: 'var(--coral)' },
        lavender: { bg: 'var(--lavender-soft)', fg: 'var(--lavender)', dot: 'var(--lavender)' },
    };
    const t = tones[tone];
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: t.bg,
            color: t.fg,
            fontSize: size === 'sm' ? 11 : 12,
            fontWeight: 600,
            padding: size === 'sm' ? '3px 8px' : '4px 10px',
            borderRadius: 999,
            letterSpacing: '0.01em',
        }}>
            {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }} />}
            {children}
        </span>
    );
}

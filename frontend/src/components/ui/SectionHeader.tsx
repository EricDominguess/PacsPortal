import type { ReactNode } from 'react';

interface Props {
    title: ReactNode;
    subtitle?: ReactNode;
    action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: Props) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14, gap: 16 }}>
            <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h2>
                {subtitle && <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>{subtitle}</div>}
            </div>
            {action}
        </div>
    );
}

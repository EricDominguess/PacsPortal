import type { ReactNode } from 'react';

interface Props {
    label: ReactNode;
    hint?: ReactNode;
    children?: ReactNode;
}

export function Field({ label, hint, children }: Props) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{label}</label>
                {hint}
            </div>
            {children}
        </div>
    );
}

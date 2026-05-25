import type { ReactNode } from 'react';
import type { IconName, Tone } from '../../../types/portal';
import { Card, Icon } from '../../../components/ui';

interface Props {
    tone: Tone;
    icon: IconName;
    label: ReactNode;
    value: ReactNode;
    sub?: ReactNode;
}

export function StatCard({ tone, icon, label, value, sub }: Props) {
    return (
        <Card padding={18} hover>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `var(--${tone}-soft)`, color: `var(--${tone})`,
                    display: 'grid', placeItems: 'center',
                }}>
                    <Icon name={icon} size={16} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {label}
                </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
            {sub ? <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>{sub}</div> : null}
        </Card>
    );
}

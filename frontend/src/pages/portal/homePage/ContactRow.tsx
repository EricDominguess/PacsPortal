import type { IconName } from '../../../types/portal';
import { Icon } from '../../../components/ui';

interface Props {
    icon: IconName;
    label: string;
    value: string;
}

export function ContactRow({ icon, label, value }: Props) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-subtle)', color: 'var(--text-2)', display: 'grid', placeItems: 'center' }}>
                <Icon name={icon} size={15} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
            </div>
        </div>
    );
}

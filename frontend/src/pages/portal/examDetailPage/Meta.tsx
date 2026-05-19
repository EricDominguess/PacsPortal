import type { IconName } from '../../../types/portal';
import { Icon } from '../../../components/ui';

interface Props {
    icon: IconName;
    label: string;
    value: string;
}

export function Meta({ icon, label, value }: Props) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name={icon} size={15} style={{ color: 'var(--text-3)' }} />
            <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
            </div>
        </div>
    );
}

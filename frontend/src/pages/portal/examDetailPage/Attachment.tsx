import { Icon } from '../../../components/ui';

interface Props {
    name: string;
    size: string;
    type: 'pdf' | 'image' | 'dicom';
}

export function Attachment({ name, size, type }: Props) {
    const label = type === 'pdf' ? 'PDF' : type === 'dicom' ? 'DCM' : 'IMG';
    const tone = type === 'pdf' ? 'coral' : type === 'dicom' ? 'primary' : 'lavender';
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: 10, border: '1px solid var(--border)', borderRadius: 10,
        }}>
            <div style={{
                width: 32, height: 36, borderRadius: 6,
                background: `var(--${tone}-soft)`,
                color: `var(--${tone})`,
                display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 800, letterSpacing: '0.04em',
            }}>
                {label}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{size}</div>
            </div>
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-2)', padding: 6, borderRadius: 6 }}>
                <Icon name="download" size={16} />
            </button>
        </div>
    );
}

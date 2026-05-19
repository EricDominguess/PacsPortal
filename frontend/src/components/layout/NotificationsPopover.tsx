import type { NotificationItem } from '../../types/portal';
import { Icon, popoverStyle } from '../ui';

interface Props {
    notifications: NotificationItem[];
    onClose: () => void;
}

export function NotificationsPopover({ notifications, onClose }: Props) {
    return (
        <div style={{ ...popoverStyle(), width: 360 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Notificações</div>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Marcar todas lidas</button>
            </div>
            <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                {notifications.map((n) => (
                    <div key={n.id} style={{
                        display: 'flex', gap: 10, padding: '12px 14px',
                        borderBottom: '1px solid var(--border)',
                        background: n.read ? 'transparent' : 'rgba(var(--primary-rgb), 0.04)',
                    }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `var(--${n.tone}-soft)`, color: `var(--${n.tone})`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                            <Icon name={n.icon} size={16} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{n.title}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{n.body}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{n.time}</div>
                        </div>
                        {!n.read && <div style={{ width: 7, height: 7, background: 'var(--primary)', borderRadius: 999, marginTop: 6, flexShrink: 0 }} />}
                    </div>
                ))}
            </div>
            <div style={{ padding: 10, textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Ver todas</button>
            </div>
        </div>
    );
}

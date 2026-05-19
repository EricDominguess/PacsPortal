import { useEffect, useRef, useState } from 'react';
import type { NotificationItem, Patient, ScreenId } from '../../types/portal';
import { Icon, PopoverItem, avatarStyle, iconBtnStyle, popoverStyle } from '../ui';
import { NotificationsPopover } from './NotificationsPopover';

interface Props {
    patient: Patient;
    onNavigate: (id: ScreenId) => void;
    notifications: NotificationItem[];
}

export function Topbar({ patient, onNavigate, notifications }: Props) {
    const [openNotif, setOpenNotif] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const notifRef = useRef<HTMLDivElement | null>(null);
    const profRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) setOpenNotif(false);
            if (profRef.current && !profRef.current.contains(e.target as Node)) setOpenProfile(false);
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    const unread = notifications.filter((n) => !n.read).length;

    return (
        <header style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '14px 32px',
            background: 'rgba(244,246,251,0.85)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky', top: 0, zIndex: 30,
        }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 460 }}>
                <Icon name="search" size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                <input
                    placeholder="Buscar exames, consultas, documentos…"
                    style={{
                        width: '100%',
                        padding: '9px 12px 9px 38px',
                        border: '1px solid var(--border)',
                        background: 'var(--surface)',
                        borderRadius: 10,
                        fontSize: 13,
                        outline: 'none',
                        color: 'var(--text)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                />
                <kbd style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    fontSize: 11, color: 'var(--text-3)', background: 'var(--bg-subtle)', padding: '2px 6px', borderRadius: 4,
                    fontFamily: 'JetBrains Mono, monospace',
                }} className="hide-on-mobile">⌘K</kbd>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <button title="Ajuda" style={iconBtnStyle()} onClick={() => alert('Central de Ajuda')}>
                    <Icon name="help" />
                </button>

                <div ref={notifRef} style={{ position: 'relative' }}>
                    <button title="Notificações" style={iconBtnStyle()} onClick={() => setOpenNotif((v) => !v)}>
                        <Icon name="bell" />
                        {unread > 0 && (
                            <span style={{
                                position: 'absolute', top: 6, right: 6,
                                background: 'var(--coral)', color: '#fff', fontSize: 9, fontWeight: 700,
                                minWidth: 14, height: 14, padding: '0 4px', borderRadius: 999,
                                display: 'grid', placeItems: 'center', border: '2px solid var(--bg)',
                            }}>{unread}</span>
                        )}
                    </button>
                    {openNotif && <NotificationsPopover notifications={notifications} onClose={() => setOpenNotif(false)} />}
                </div>

                <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 8px' }} />

                <div ref={profRef} style={{ position: 'relative' }}>
                    <button onClick={() => setOpenProfile((v) => !v)} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '4px 8px 4px 4px', border: '1px solid var(--border)',
                        background: 'var(--surface)', borderRadius: 999, cursor: 'pointer',
                    }}>
                        <div style={avatarStyle(32)}>{patient.initials}</div>
                        <div style={{ textAlign: 'left' }} className="hide-on-mobile">
                            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.1 }}>{patient.firstName}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Paciente</div>
                        </div>
                        <Icon name="chevron-down" size={14} style={{ color: 'var(--text-3)', marginRight: 6 }} />
                    </button>
                    {openProfile && (
                        <div style={popoverStyle()}>
                            <div style={{ padding: 12, borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{patient.fullName}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{patient.email}</div>
                            </div>
                            <PopoverItem icon="user" onClick={() => { setOpenProfile(false); onNavigate('perfil'); }}>Meu perfil</PopoverItem>
                            <PopoverItem icon="shield" onClick={() => setOpenProfile(false)}>Privacidade</PopoverItem>
                            <PopoverItem icon="help" onClick={() => setOpenProfile(false)}>Ajuda</PopoverItem>
                            <div style={{ borderTop: '1px solid var(--border)' }} />
                            <PopoverItem icon="logout" tone="coral" onClick={() => { setOpenProfile(false); onNavigate('login'); }}>Sair</PopoverItem>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

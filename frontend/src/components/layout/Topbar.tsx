import { useEffect, useRef, useState } from 'react';
import type { Patient, ScreenId } from '../../types/portal';
import { CLINIC } from '../../data/clinic';
import { Button, Icon, LogoMark, PopoverItem, avatarStyle, popoverStyle } from '../ui';

interface Props {
    patient: Patient;
    onNavigate: (id: ScreenId) => void;
}

export function Topbar({ patient, onNavigate }: Props) {
    const [openProfile, setOpenProfile] = useState(false);
    const [openSupport, setOpenSupport] = useState(false);
    const profRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (profRef.current && !profRef.current.contains(e.target as Node)) setOpenProfile(false);
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    return (
        <>
            <header className="topbar">
                <div className="topbar-brand">
                    <LogoMark size={34} />
                </div>

                <div className="topbar-actions">
                    <Button variant="secondary" size="sm" icon="logout" onClick={() => onNavigate('login')}>
                        Sair
                    </Button>

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
                                <PopoverItem icon="phone" onClick={() => { setOpenProfile(false); setOpenSupport(true); }}>Atendimento</PopoverItem>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {openSupport && (
                <div className="modal-overlay" onClick={() => setOpenSupport(false)}>
                    <div className="modal-card" role="dialog" aria-modal="true" aria-label="Atendimento" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <div className="modal-title">Atendimento {CLINIC.shortName}</div>
                                <div className="modal-subtitle">Informacoes do hospital</div>
                            </div>
                            <button className="modal-close" onClick={() => setOpenSupport(false)} aria-label="Fechar">
                                <Icon name="x" size={16} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-row">
                                <Icon name="phone" size={16} />
                                <div>
                                    <div className="modal-label">Central 24h</div>
                                    <div className="modal-value">{CLINIC.phone}</div>
                                </div>
                            </div>
                            <div className="modal-row">
                                <Icon name="mail" size={16} />
                                <div>
                                    <div className="modal-label">E-mail</div>
                                    <div className="modal-value">{CLINIC.email}</div>
                                </div>
                            </div>
                            <div className="modal-row">
                                <Icon name="pin" size={16} />
                                <div>
                                    <div className="modal-label">Endereco</div>
                                    <div className="modal-value">{CLINIC.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

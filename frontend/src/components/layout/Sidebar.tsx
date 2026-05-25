import type { ScreenId } from '../../types/portal';
import { CLINIC } from '../../data/clinic';
import { Icon, LogoMark, Button } from '../ui';
import { NAV_ITEMS } from './navItems';

interface Props {
    current: ScreenId;
    onNavigate: (id: ScreenId) => void;
    onLogout: () => void;
}

export function Sidebar({ current, onNavigate, onLogout }: Props) {
    return (
        <aside style={{
            width: 240,
            flexShrink: 0,
            background: 'var(--surface)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 14px',
            gap: 4,
            position: 'sticky',
            top: 0,
            height: '100vh',
        }} className="hide-on-mobile">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px 18px' }}>
                <LogoMark size={34} />
                <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{CLINIC.shortName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.02em' }}>Portal do Paciente</div>
                </div>
            </div>

            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 10px 6px' }}>Menu</div>

            {NAV_ITEMS.map((item) => {
                const active = current === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 12px',
                            borderRadius: 10,
                            border: 'none',
                            background: active ? 'var(--primary-soft)' : 'transparent',
                            color: active ? 'var(--primary)' : 'var(--text-2)',
                            fontWeight: active ? 600 : 500,
                            fontSize: 14,
                            cursor: 'pointer',
                            transition: 'background .12s',
                            textAlign: 'left',
                        }}
                        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                        <Icon name={item.icon} size={18} stroke={active ? 1.8 : 1.6} />
                        <span>{item.label}</span>
                        {item.id === 'exames' && (
                            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, background: active ? '#fff' : 'var(--primary-soft)', color: 'var(--primary)', padding: '1px 7px', borderRadius: 999 }}>3</span>
                        )}
                    </button>
                );
            })}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{
                    margin: '14px 4px 8px',
                    padding: 14,
                    background: 'linear-gradient(160deg, rgba(var(--primary-rgb), 0.06), rgba(var(--primary-rgb), 0.12))',
                    border: '1px solid var(--primary-soft-2)',
                    borderRadius: 12,
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', right: -20, top: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(var(--primary-rgb), 0.08)' }} />
                    <div style={{ position: 'relative' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Precisa de ajuda?</div>
                        <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10, lineHeight: 1.45 }}>Fale com {CLINIC.shortName}.</div>
                        <Button variant="primary" size="sm" icon="mail">Suporte</Button>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 12px',
                        borderRadius: 10, border: 'none', background: 'transparent',
                        color: 'var(--text-2)', fontWeight: 500, fontSize: 14, cursor: 'pointer', textAlign: 'left',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                    <Icon name="logout" size={18} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
}

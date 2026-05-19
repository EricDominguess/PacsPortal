import { useState } from 'react';
import { TENANTS } from './tenants';
import { Icon } from '../components/ui';

interface Props {
    current: string;
    onPick: (id: string) => void;
}

export function DemoSwitcher({ current, onPick }: Props) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 90, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {open && (
                <div style={{
                    position: 'absolute', bottom: 56, right: 0,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    boxShadow: 'var(--shadow-lg)',
                    width: 260,
                    padding: 8,
                    marginBottom: 4,
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 10px 4px',
                    }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Demo · trocar tenant</div>
                    </div>
                    {TENANTS.map((t) => {
                        const isCurrent = t.id === current;
                        return (
                            <button
                                key={t.id}
                                onClick={() => { onPick(t.id); }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    width: '100%', padding: '8px 10px',
                                    border: 'none', borderRadius: 8,
                                    background: isCurrent ? 'var(--primary-soft)' : 'transparent',
                                    cursor: 'pointer', textAlign: 'left',
                                    marginBottom: 2,
                                }}
                                onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                                onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
                            >
                                <div style={{
                                    width: 28, height: 28, borderRadius: 7,
                                    background: `linear-gradient(140deg, ${t.logoGradient[0]}, ${t.logoGradient[1]})`,
                                    color: '#fff', fontSize: 10, fontWeight: 700,
                                    display: 'grid', placeItems: 'center',
                                    flexShrink: 0,
                                }}>{t.initials}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.shortName}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{t.vibe}</div>
                                </div>
                                {isCurrent && <Icon name="check" size={14} style={{ color: 'var(--primary)' }} />}
                            </button>
                        );
                    })}
                    <div style={{ padding: '6px 10px 4px', fontSize: 11, color: 'var(--text-3)', borderTop: '1px solid var(--border)', marginTop: 4 }}>
                        Switcher só para demo. Em produção é por subdomínio.
                    </div>
                </div>
            )}
            <button
                onClick={() => setOpen((v) => !v)}
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 14px',
                    background: 'var(--text)', color: '#fff',
                    border: 'none', borderRadius: 999,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    boxShadow: 'var(--shadow-lg)',
                    letterSpacing: '0.02em',
                }}
            >
                <Icon name="sparkle" size={14} />
                Tenant
                <Icon name={open ? 'chevron-down' : 'chevron-right'} size={14} />
            </button>
        </div>
    );
}

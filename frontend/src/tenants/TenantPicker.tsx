import { TENANTS } from './tenants';
import { Icon } from '../components/ui';

interface Props {
    current: string;
    onPick: (id: string) => void;
    onClose: () => void;
}

export function TenantPicker({ current, onPick, onClose }: Props) {
    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(11,23,38,0.55)',
                backdropFilter: 'blur(4px)',
                display: 'grid', placeItems: 'center',
                padding: 20, zIndex: 100,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--surface)',
                    borderRadius: 18,
                    padding: 28,
                    width: '100%', maxWidth: 560,
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', right: 14, top: 14,
                        width: 32, height: 32, border: 'none', background: 'var(--bg-subtle)',
                        borderRadius: 8, cursor: 'pointer', display: 'grid', placeItems: 'center',
                        color: 'var(--text-2)',
                    }}
                    aria-label="Fechar"
                >
                    <Icon name="x" size={16} />
                </button>
                <div style={{ marginBottom: 18 }}>
                    <h2 className="serif" style={{ margin: 0, fontSize: 28, letterSpacing: '-0.01em' }}>Selecione seu hospital</h2>
                    <p style={{ color: 'var(--text-2)', fontSize: 14, margin: '6px 0 0' }}>
                        O Portal do Paciente é compartilhado por várias instituições de saúde. Escolha a sua para continuar.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {TENANTS.map((t) => {
                        const isCurrent = t.id === current;
                        return (
                            <button
                                key={t.id}
                                onClick={() => onPick(t.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: 14,
                                    borderRadius: 12,
                                    border: '1.5px solid',
                                    borderColor: isCurrent ? t.primary : 'var(--border)',
                                    background: isCurrent ? t.primarySoft : 'var(--surface)',
                                    cursor: 'pointer', textAlign: 'left',
                                    transition: 'all .15s',
                                }}
                                onMouseEnter={(e) => {
                                    if (isCurrent) return;
                                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                                    e.currentTarget.style.background = 'var(--bg-subtle)';
                                }}
                                onMouseLeave={(e) => {
                                    if (isCurrent) return;
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                    e.currentTarget.style.background = 'var(--surface)';
                                }}
                            >
                                <div style={{
                                    width: 44, height: 44, borderRadius: 10,
                                    background: `linear-gradient(140deg, ${t.logoGradient[0]}, ${t.logoGradient[1]})`,
                                    color: '#fff', fontWeight: 700, fontSize: 14,
                                    display: 'grid', placeItems: 'center',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
                                    flexShrink: 0,
                                }}>
                                    {t.initials}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{t.name}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.tagline}</div>
                                </div>
                                {isCurrent && (
                                    <div style={{ color: t.primary, flexShrink: 0 }}>
                                        <Icon name="check-circle" size={20} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>
                    Em produção, o hospital é detectado automaticamente pelo subdomínio (ex: <span className="mono">saolucas.portal.com.br</span>).
                </div>
            </div>
        </div>
    );
}

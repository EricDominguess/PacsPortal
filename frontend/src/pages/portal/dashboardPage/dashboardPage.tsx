import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, EmptyState, Icon } from '../../../components/ui';
import { useTenant } from '../../../tenants/PortalTenantContext';
import { PortalLayout } from '../layout/PortalLayout';
import { PATIENT, LAST_LOGIN, COMPLETION } from '../../../data/patient';
import { ProgressRing } from './ProgressRing';
import { StatCard } from './StatCard';
import { QuickAction } from './QuickAction';
import { ContactRow } from './ContactRow';

export function DashboardPage() {
    const navigate = useNavigate();
    const tenant = useTenant();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

    const go = (path: string) => () => navigate(path);

    return (
        <PortalLayout current="home">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-xl)',
                    padding: '28px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', right: -40, top: -40, width: 280, height: 280,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(31,63,184,0.06), transparent 70%)',
                    }} />
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 auto' }}>
                            <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </div>
                            <h1 className="serif" style={{ margin: 0, fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                {greeting}, <em style={{ fontStyle: 'italic' }}>{PATIENT.firstName}</em>.
                            </h1>
                            <p style={{ color: 'var(--text-2)', fontSize: 15, margin: '8px 0 0', maxWidth: 560 }}>
                                Aqui você acompanha seus exames, consultas e documentos. Tudo organizado para você cuidar de quem importa.
                            </p>
                        </div>

                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '14px 18px',
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                            borderRadius: 14,
                            minWidth: 240,
                        }}>
                            <ProgressRing pct={COMPLETION.pct} />
                            <div>
                                <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Perfil</div>
                                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{COMPLETION.pct}% completo</div>
                                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
                                    {COMPLETION.remaining} {COMPLETION.remaining === 1 ? 'item pendente' : 'itens pendentes'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <StatCard tone="primary" icon="flask" label="Exames disponíveis" value="0" sub="Aguardando seu primeiro" />
                    <StatCard
                        tone="sage"
                        icon="calendar"
                        label="Próxima consulta"
                        value="—"
                        sub={<a href="#" onClick={(e) => { e.preventDefault(); navigate('/agendar'); }} style={{ color: 'var(--sage)', fontWeight: 600 }}>Agendar agora →</a>}
                    />
                    <StatCard tone="amber" icon="clock" label="Último acesso" value={LAST_LOGIN.short} sub={LAST_LOGIN.device} />
                    <StatCard tone="lavender" icon="bell" label="Notificações" value="3" sub="2 não lidas" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24, alignItems: 'stretch' }} className="row-stack">
                    <Card padding={0} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Icon name="sparkle" size={16} style={{ color: 'var(--primary)' }} />
                                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Vamos começar</h3>
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
                                    {COMPLETION.remaining} passo{COMPLETION.remaining !== 1 ? 's' : ''} para aproveitar o portal por completo
                                </div>
                            </div>
                            <Badge tone="primary" size="sm">{COMPLETION.done}/{COMPLETION.total}</Badge>
                        </div>

                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {COMPLETION.items.map((it, i) => (
                                <li key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    padding: '14px 24px',
                                    borderBottom: i < COMPLETION.items.length - 1 ? '1px solid var(--border)' : 'none',
                                }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: 999,
                                        border: it.done ? 'none' : '1.5px dashed var(--border-strong)',
                                        background: it.done ? 'var(--sage)' : 'transparent',
                                        color: '#fff',
                                        display: 'grid', placeItems: 'center', flexShrink: 0,
                                    }}>
                                        {it.done && <Icon name="check" size={14} stroke={2.4} />}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontWeight: 600, fontSize: 14,
                                            color: it.done ? 'var(--text-3)' : 'var(--text)',
                                            textDecoration: it.done ? 'line-through' : 'none',
                                        }}>
                                            {it.title}
                                        </div>
                                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{it.desc}</div>
                                    </div>
                                    {!it.done && (
                                        <Button variant="ghost" size="sm" iconRight="chevron-right">
                                            {it.cta}
                                        </Button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card padding={0} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Atalhos rápidos</h3>
                            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>O que você quer fazer hoje?</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                            <QuickAction icon="plus-circle" tone="primary" label="Agendar exame" onClick={go('/agendar')} />
                            <QuickAction icon="calendar" tone="sage" label="Marcar consulta" onClick={go('/agendar')} />
                            <QuickAction icon="doc" tone="amber" label="Solicitar receita" onClick={go('/documentos')} />
                            <QuickAction icon="syringe" tone="lavender" label="Carteira de vacinas" onClick={go('/documentos')} />
                        </div>
                    </Card>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }} className="row-stack">
                    <Card padding={0}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 14px', borderBottom: '1px solid var(--border)' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Meus exames</h3>
                                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Resultados liberados nos últimos 12 meses</div>
                            </div>
                            <button
                                onClick={go('/exames')}
                                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                            >
                                Ver todos <Icon name="chevron-right" size={14} />
                            </button>
                        </div>
                        <EmptyState
                            icon="flask"
                            title="Nenhum exame por aqui ainda"
                            body="Quando um exame for liberado pelo laboratório, ele aparece automaticamente aqui — você é notificado por e-mail e SMS."
                            action={(
                                <div style={{ display: 'inline-flex', gap: 8 }}>
                                    <Button variant="primary" icon="plus-circle" onClick={go('/agendar')}>Agendar exame</Button>
                                    <Button variant="secondary" onClick={go('/exames')}>Ver exemplo</Button>
                                </div>
                            )}
                        />
                    </Card>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Card style={{
                            background: 'linear-gradient(165deg, #e3f1ea 0%, #f4f9f5 100%)',
                            border: '1px solid #cce4d6',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--sage)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>
                                <Icon name="heart" size={14} /> Dica do dia
                            </div>
                            <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.4, marginBottom: 6 }}>
                                Mantenha seus dados sempre atualizados.
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                                Um telefone e e-mail corretos garantem que você receba o resultado dos exames assim que liberado.
                            </div>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); navigate('/perfil'); }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12, color: 'var(--sage)', fontSize: 13, fontWeight: 700 }}
                            >
                                Revisar meus dados <Icon name="arrow-right" size={14} />
                            </a>
                        </Card>

                        <Card>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
                                <Icon name="phone" size={14} /> Atendimento {tenant.shortName}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <ContactRow icon="phone" label="Central 24h" value={tenant.phone} />
                                <ContactRow icon="mail" label="E-mail" value={tenant.email} />
                                <ContactRow icon="pin" label="Endereço" value={tenant.address} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

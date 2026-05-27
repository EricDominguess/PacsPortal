import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Icon, SectionHeader } from '../../components/ui';
import { admin, type PacienteResumo } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import type { IconName, Tone } from '../../types/portal';

interface StatProps { label: string; value: number; icon: IconName; tone: Tone }

function StatCard({ label, value, icon, tone }: StatProps) {
    const tones: Record<string, { bg: string; fg: string }> = {
        primary: { bg: 'var(--primary-soft)', fg: 'var(--primary)' },
        sage: { bg: 'var(--sage-soft)', fg: 'var(--sage)' },
        amber: { bg: 'var(--amber-soft)', fg: 'var(--amber)' },
        coral: { bg: 'var(--coral-soft)', fg: 'var(--coral)' },
    };
    const t = tones[tone] || tones.primary;
    return (
        <Card elevated style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: t.bg, color: t.fg, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name={icon} size={22} />
            </div>
            <div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>{value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>{label}</div>
            </div>
        </Card>
    );
}

export function DashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState<PacienteResumo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        admin.listarPacientes().then(setPacientes).catch(() => {}).finally(() => setLoading(false));
    }, []);

    const total = pacientes.length;
    const ativos = pacientes.filter(p => p.ativo).length;
    const pendentes = pacientes.filter(p => p.primeiroAcesso).length;
    const emailPendente = pacientes.filter(p => !p.primeiroAcesso && !p.emailConfirmado).length;

    return (
        <>
            <div style={{ marginBottom: 28 }}>
                <h1 className="serif" style={{ fontSize: 28, margin: 0, color: 'var(--text)' }}>
                    Bem-vindo, {user?.nome?.split(' ')[0]}
                </h1>
                <p style={{ color: 'var(--text-3)', fontSize: 14, marginTop: 4 }}>
                    Gerencie os pacientes e acompanhe o status de acesso ao portal.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
                <StatCard label="Total de pacientes" value={total} icon="user" tone="primary" />
                <StatCard label="Ativos" value={ativos} icon="check-circle" tone="sage" />
                <StatCard label="Aguardando 1o acesso" value={pendentes} icon="clock" tone="amber" />
                <StatCard label="Email pendente" value={emailPendente} icon="mail" tone="coral" />
            </div>

            <SectionHeader
                title="Pacientes recentes"
                subtitle="Ultimos pacientes cadastrados"
                action={
                    <button onClick={() => navigate('/admin/pacientes')} style={{
                        border: 'none', background: 'transparent', color: 'var(--primary)',
                        fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                        Ver todos <Icon name="arrow-right" size={14} />
                    </button>
                }
            />

            <Card elevated>
                {loading ? (
                    <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}>Carregando...</div>
                ) : pacientes.length === 0 ? (
                    <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-3)', fontSize: 14 }}>Nenhum paciente cadastrado ainda.</div>
                ) : (
                    pacientes.slice(0, 5).map((p, i) => (
                        <div key={p.id} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                            padding: '14px 0',
                            borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 999, flexShrink: 0,
                                    background: 'linear-gradient(140deg, #d6deef, #c1cce4)', color: 'var(--primary)',
                                    fontWeight: 700, fontSize: 13, display: 'grid', placeItems: 'center',
                                }}>
                                    {p.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{p.email}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                {p.primeiroAcesso && (
                                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber)' }}>
                                        1o Acesso
                                    </span>
                                )}
                                {!p.primeiroAcesso && !p.emailConfirmado && (
                                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: 'var(--coral-soft)', color: 'var(--coral)' }}>
                                        Email pendente
                                    </span>
                                )}
                                {!p.primeiroAcesso && p.emailConfirmado && (
                                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: 'var(--sage-soft)', color: 'var(--sage)' }}>
                                        Ativo
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </Card>
        </>
    );
}

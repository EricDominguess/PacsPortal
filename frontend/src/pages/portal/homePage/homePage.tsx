import { useNavigate } from 'react-router-dom';
import { Card, EmptyState, Icon } from '../../../components/ui';
import { CLINIC } from '../../../data/clinic';
import { PortalLayout } from '../layout/PortalLayout';
import { PATIENT, LAST_LOGIN } from '../../../data/patient';
import { EXAMS } from '../../../data/exams';
import { StatCard } from './StatCard';
import { ContactRow } from './ContactRow';
import { ExamRow } from '../examsPage/ExamRow';
import { ExamCard } from '../examsPage/ExamCard';

export function HomePage() {
    const navigate = useNavigate();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    const city = CLINIC.address.split('—').pop()?.trim() || CLINIC.address;
    const availableCount = EXAMS.filter((e) => e.status === 'disponivel').length;
    const inAnalysisCount = EXAMS.filter((e) => e.status === 'em_analise').length;
    const recentExams = EXAMS.slice(0, 5);

    return (
        <PortalLayout current="home">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{
                    background: 'linear-gradient(140deg, rgba(var(--primary-rgb), 0.14), rgba(var(--primary-rgb), 0.04))',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-xl)',
                    padding: '26px 28px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', right: -60, top: -80, width: 220, height: 220,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.28), transparent 70%)',
                    }} />
                    <div style={{
                        position: 'absolute', left: -40, bottom: -60, width: 180, height: 180,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.16), transparent 70%)',
                    }} />
                    <div style={{ position: 'relative' }}>
                        <div style={{ flex: '1 1 auto' }}>
                            <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </div>
                            <h1 className="serif" style={{ margin: 0, fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                {greeting}, <em style={{ fontStyle: 'italic' }}>{PATIENT.firstName}</em>.
                            </h1>
                            <p style={{ color: 'var(--text-2)', fontSize: 15, margin: '8px 0 0', maxWidth: 560 }}>
                                Acompanhe seus exames de imagem e laudos em um so lugar, com acesso rapido e seguro.
                            </p>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                                <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 11, fontWeight: 600 }}>
                                    {CLINIC.shortName}
                                </span>
                                <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 11, fontWeight: 600 }}>
                                    {city}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <StatCard tone="lavender" icon="image" label="Imagens liberadas" value={availableCount.toString()} sub="Ultimos 12 meses" />
                    <StatCard tone="amber" icon="clock" label="Em analise" value={inAnalysisCount.toString()} sub="Aguardando laudo" />
                    <StatCard tone="amber" icon="clock" label="Ultimo acesso" value={LAST_LOGIN.short} sub={LAST_LOGIN.device} />
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
                            <Icon name="phone" size={14} /> Atendimento {CLINIC.shortName}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <ContactRow icon="phone" label="Central 24h" value={CLINIC.phone} />
                            <ContactRow icon="mail" label="E-mail" value={CLINIC.email} />
                            <ContactRow icon="pin" label="Endereco" value={CLINIC.address} />
                        </div>
                    </Card>
                </div>

                {/* Desktop: tabela dentro de card unico */}
                <div className="hide-on-mobile">
                    <Card padding={0} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Exames de imagem</h3>
                                <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Laudos e imagens recentes</div>
                            </div>
                        </div>
                        {recentExams.length === 0 ? (
                            <EmptyState
                                icon="image"
                                title="Nenhum exame de imagem por aqui ainda"
                                body="Assim que um exame de imagem for liberado, ele aparece automaticamente nesta lista."
                            />
                        ) : (
                            <div>
                                {recentExams.map((ex, i) => (
                                    <ExamRow
                                        key={ex.id}
                                        exam={ex}
                                        onClick={() => navigate(`/exames/${ex.id}`)}
                                        isLast={i === recentExams.length - 1}
                                    />
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                {/* Mobile: cards individuais */}
                <div className="show-on-mobile">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Exames de imagem</h3>
                            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>Laudos e imagens recentes</div>
                        </div>
                    </div>
                    {recentExams.length === 0 ? (
                        <Card>
                            <EmptyState
                                icon="image"
                                title="Nenhum exame de imagem por aqui ainda"
                                body="Assim que um exame de imagem for liberado, ele aparece automaticamente nesta lista."
                            />
                        </Card>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {recentExams.map((ex) => (
                                <ExamCard
                                    key={ex.id}
                                    exam={ex}
                                    onClick={() => navigate(`/exames/${ex.id}`)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PortalLayout>
    );
}
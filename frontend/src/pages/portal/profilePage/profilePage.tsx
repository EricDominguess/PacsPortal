import { useNavigate } from 'react-router-dom';
import { Button, Card, Icon } from '../../../components/ui';
import { EXAMS } from '../../../data/exams';
import { LAST_LOGIN, PATIENT } from '../../../data/patient';
import { CLINIC } from '../../../data/clinic';
import { PortalLayout } from '../layout/PortalLayout';

export function ProfilePage() {
    const navigate = useNavigate();
    const availableCount = EXAMS.filter((e) => e.status === 'disponivel').length;
    const city = CLINIC.address.split('—').pop()?.trim() || CLINIC.address;

    return (
        <PortalLayout current="perfil">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.28), transparent 70%)',
                    }} />
                    <div style={{
                        position: 'absolute', left: -40, bottom: -60, width: 180, height: 180,
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.16), transparent 70%)',
                    }} />

                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: 18,
                                background: 'var(--primary-soft)', color: 'var(--primary)',
                                display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 20,
                                boxShadow: '0 10px 24px rgba(var(--primary-rgb), 0.12)',
                            }}>
                                {PATIENT.initials}
                            </div>
                            <div>
                                <div style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 600 }}>
                                    Meu perfil
                                </div>
                                <h1 className="serif" style={{ margin: '6px 0 4px', fontSize: 34, letterSpacing: '-0.02em' }}>{PATIENT.fullName}</h1>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 11, fontWeight: 600 }}>
                                        Paciente do {CLINIC.shortName}
                                    </span>
                                    <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--border)', fontSize: 11, fontWeight: 600 }}>
                                        {city}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                            <div className="hide-on-mobile">
                                <Button variant="secondary" size="sm" icon="chevron-left" onClick={() => navigate('/home')}>
                                    Voltar para Home
                                </Button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))', gap: 12 }}>
                                <div style={{ padding: 12, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Ultimo acesso</div>
                                    <div style={{ fontWeight: 700, marginTop: 6 }}>{LAST_LOGIN.short}</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{LAST_LOGIN.device}</div>
                                </div>
                                <div style={{ padding: 12, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Status</div>
                                    <div style={{ fontWeight: 700, marginTop: 6 }}>Cadastro ativo</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Dados validados</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
                            <Icon name="image" size={14} /> Imagens liberadas
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{availableCount}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>Ultimos 12 meses</div>
                    </Card>
                    <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
                            <Icon name="pin" size={14} /> Unidade
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{city}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>{CLINIC.shortName}</div>
                    </Card>
                    <Card style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>
                            <Icon name="shield" size={14} /> Seguranca
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>Conta protegida</div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>LGPD e autentificacao</div>
                    </Card>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
                            <Icon name="user" size={14} /> Dados pessoais
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>Nome completo</div>
                        <div style={{ fontWeight: 600, marginBottom: 12 }}>{PATIENT.fullName}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>CPF</div>
                        <div style={{ fontWeight: 600 }}>***.***.***-**</div>
                    </Card>

                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
                            <Icon name="mail" size={14} /> Contato
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>E-mail</div>
                        <div style={{ fontWeight: 600, marginBottom: 12 }}>{PATIENT.email}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>Telefone</div>
                        <div style={{ fontWeight: 600 }}>{PATIENT.phone}</div>
                    </Card>

                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
                            <Icon name="pin" size={14} /> Unidade
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>Endereco</div>
                        <div style={{ fontWeight: 600 }}>{CLINIC.address}</div>
                    </Card>

                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
                            <Icon name="phone" size={14} /> Atendimento
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>Central 24h</div>
                        <div style={{ fontWeight: 600, marginBottom: 12 }}>{CLINIC.phone}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>E-mail</div>
                        <div style={{ fontWeight: 600 }}>{CLINIC.email}</div>
                    </Card>
                </div>
            </div>
        </PortalLayout>
    );
}

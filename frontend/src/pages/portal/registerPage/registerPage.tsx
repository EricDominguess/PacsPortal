import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, LogoMark, inputStyle } from '../../../components/ui';
import { usePortalTenant } from '../../../tenants/PortalTenantContext';
import { TenantPicker } from '../../../tenants/TenantPicker';
import { Field } from '../loginPage/Field';

const formatCpf = (v: string): string => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

export function PortalRegisterPage() {
    const navigate = useNavigate();
    const { tenant, setTenantId } = usePortalTenant();
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [pickerOpen, setPickerOpen] = useState(false);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <>
            <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg)' }}>
                <div style={{
                    background: 'linear-gradient(160deg, var(--hero-grad-1) 0%, var(--hero-grad-2) 60%, var(--hero-grad-3) 100%)',
                    color: '#fff',
                    padding: '48px 56px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                }} className="hide-on-mobile">
                    <div style={{ position: 'absolute', right: -120, top: -120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)' }} />
                    <div style={{ position: 'absolute', left: -80, bottom: -80, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div style={{ position: 'absolute', left: 40, bottom: 80, width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                        <LogoMark size={42} />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>{tenant.name}</div>
                            <div style={{ fontSize: 12, opacity: 0.75 }}>Portal do Paciente</div>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65, marginBottom: 18 }}>{tenant.tagline}</div>
                        <h1 className="serif" style={{ fontSize: 56, lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em' }}>
                            Acompanhe exames,<br />consultas e <em style={{ fontStyle: 'italic' }}>documentos</em>—<br />com tranquilidade.
                        </h1>
                        <p style={{ fontSize: 15, maxWidth: 480, marginTop: 22, opacity: 0.8, lineHeight: 1.55 }}>
                            Tudo o que você precisa para cuidar de você e da sua família, organizado, seguro e disponível 24 horas.
                        </p>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', gap: 28, fontSize: 13, opacity: 0.85 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="shield" size={16} /> LGPD</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="lock" size={16} /> Conexão segura</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check-circle" size={16} /> Certificado ISO</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px' }}>
                    <div style={{ width: '100%', maxWidth: 380 }}>
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'var(--primary-soft)', borderRadius: 999, marginBottom: 14 }}>
                                <LogoMark size={20} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>{tenant.shortName}</span>
                                <button
                                    type="button"
                                    onClick={() => setPickerOpen(true)}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: 11, fontWeight: 600, cursor: 'pointer', padding: '0 2px', textDecoration: 'underline' }}
                                >
                                    trocar
                                </button>
                            </div>
                            <h2 className="serif" style={{ fontSize: 36, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1 }}>Bem-vindo, Crie sua conta</h2>
                            <p style={{ color: 'var(--text-2)', fontSize: 14, marginTop: 8 }}>
                                Preencha seus dados para continuar.
                            </p>
                        </div>

                        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <Field label="Nome">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Seu nome completo"
                                    style={inputStyle()}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                                />
                            </Field>

                            <Field label="CPF">
                                <input
                                    value={cpf}
                                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                                    placeholder="000.000.000-00"
                                    inputMode="numeric"
                                    style={inputStyle()}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                                />
                            </Field>

                            <Field label="E-mail">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu.email@exemplo.com"
                                    style={inputStyle()}
                                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                                />
                            </Field>

                            <Field
                                label="Senha"
                                hint={<a href="#" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 12 }}>Esqueci minha senha</a>}
                            >
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                        placeholder="Digite sua senha"
                                        style={{ ...inputStyle(), paddingRight: 40 }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                                    />
                                    <button type="button" onClick={() => setShowPwd((v) => !v)} style={{
                                        position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                                        width: 30, height: 30, border: 'none', background: 'transparent', cursor: 'pointer',
                                        color: 'var(--text-3)', borderRadius: 6, display: 'grid', placeItems: 'center',
                                    }}>
                                        <Icon name={showPwd ? 'eye-off' : 'eye'} size={16} />
                                    </button>
                                </div>
                            </Field>

                            <Field label="Confirmar senha">
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        value={confirmPwd}
                                        onChange={(e) => setConfirmPwd(e.target.value)}
                                        placeholder="Confirme sua senha"
                                        style={{ ...inputStyle(), paddingRight: 40 }}
                                        onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                                    />
                                    <button type="button" onClick={() => setShowPwd((v) => !v)} style={{
                                        position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                                        width: 30, height: 30, border: 'none', background: 'transparent', cursor: 'pointer',
                                        color: 'var(--text-3)', borderRadius: 6, display: 'grid', placeItems: 'center',
                                    }}>
                                        <Icon name={showPwd ? 'eye-off' : 'eye'} size={16} />
                                    </button>
                                </div>
                            </Field>

                            <Button type="submit" variant="primary" full size="md" iconRight="arrow-right" style={{ marginTop: 8 }}>
                                Criar conta
                            </Button>

                        </form>

                        <div style={{ marginTop: 28, textAlign: 'center', fontSize: 13, color: 'var(--text-2)' }}>
                            Já tem uma conta? <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Entrar</a>
                        </div>

                        <div style={{ marginTop: 36, paddingTop: 20, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
                            Ao continuar, você aceita os <a href="#" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Termos</a> e <a href="#" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Política de Privacidade</a>.
                        </div>
                    </div>
                </div>
            </div>
            {pickerOpen && (
                <TenantPicker
                    current={tenant.id}
                    onPick={(id) => { setTenantId(id); setPickerOpen(false); }}
                    onClose={() => setPickerOpen(false)}
                />
            )}
        </>
    );
}

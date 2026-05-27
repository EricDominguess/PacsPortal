import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, LogoMark } from '../../../components/ui';
import { CLINIC } from '../../../data/clinic';
import { useAuth } from '../../../context/AuthContext';
import { auth } from '../../../services/api';
import bgPattern from '../../../assets/CIS_patterns_background.jpg';

const loginInput: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 10,
    fontSize: 16,
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    outline: 'none',
};

type Step = 'login' | 'primeiro-acesso' | 'criar-senha' | 'confirmar-email';

export function PortalLoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [step, setStep] = useState<Step>('login');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    // Primeiro acesso
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Confirmar email
    const [tokenEmail, setTokenEmail] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            const res = await auth.login(email, pwd);
            login(res.token, { nome: res.nome, email: res.email, perfil: res.perfil as 'Admin' | 'Paciente' });
            navigate(res.perfil === 'Admin' ? '/admin' : '/home');
        } catch (err: any) {
            if (err.primeiroAcesso) { setStep('primeiro-acesso'); setError(''); }
            else if (err.emailNaoConfirmado) { setStep('confirmar-email'); setError(''); }
            else setError(err.mensagem || 'Erro ao fazer login.');
        } finally { setLoading(false); }
    };

    const handleValidarCodigo = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            await auth.validarCodigo(email, codigo);
            setStep('criar-senha');
        } catch (err: any) {
            setError(err.mensagem || 'Codigo invalido.');
        } finally { setLoading(false); }
    };

    const handleCriarSenha = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            const res = await auth.criarSenha(email, codigo, novaSenha, confirmarSenha);
            setMsg(res.mensagem);
            setStep('confirmar-email');
        } catch (err: any) {
            setError(err.mensagem || 'Erro ao criar senha.');
        } finally { setLoading(false); }
    };

    const handleConfirmarEmail = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setLoading(true);
        try {
            await auth.confirmarEmail(email, tokenEmail);
            setMsg('Email confirmado! Faca login com sua nova senha.');
            setStep('login'); setPwd('');
        } catch (err: any) {
            setError(err.mensagem || 'Codigo invalido.');
        } finally { setLoading(false); }
    };

    const handleReenviar = async () => {
        setError(''); setLoading(true);
        try {
            const res = await auth.reenviarConfirmacao(email);
            setMsg(res.mensagem);
        } catch (err: any) {
            setError(err.mensagem || 'Erro ao reenviar.');
        } finally { setLoading(false); }
    };

    const renderForm = () => {
        if (step === 'primeiro-acesso') return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'rgba(255,255,255,0.47)', borderRadius: 999, marginBottom: 14 }}>
                        <LogoMark size={20} />
                    </div>
                    <h2 className="serif" style={{ fontSize: 28, margin: 0, color: '#fff' }}>Primeiro acesso</h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 8 }}>
                        Digite o codigo fornecido pelo hospital.
                    </p>
                </div>
                <form onSubmit={handleValidarCodigo} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Email</label>
                        <input value={email} readOnly style={{ ...loginInput, opacity: 0.7 }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Codigo de acesso</label>
                        <input value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} placeholder="ABC-1234-XYZ"
                            className="mono" style={{ ...loginInput, letterSpacing: '0.1em', textAlign: 'center', fontSize: 20 }}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }} />
                    </div>
                    {error && <div style={{ fontSize: 13, color: '#ffb4ab', fontWeight: 600 }}>{error}</div>}
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '13px 20px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
                        background: '#fff', color: 'var(--primary)', cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1,
                    }}>
                        {loading ? 'Validando...' : 'Validar codigo'}
                    </button>
                    <button type="button" onClick={() => { setStep('login'); setError(''); }} style={{
                        background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', fontWeight: 600, marginTop: 4,
                    }}>
                        Voltar ao login
                    </button>
                </form>
            </>
        );

        if (step === 'criar-senha') return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'rgba(255,255,255,0.47)', borderRadius: 999, marginBottom: 14 }}>
                        <LogoMark size={20} />
                    </div>
                    <h2 className="serif" style={{ fontSize: 28, margin: 0, color: '#fff' }}>Crie sua senha</h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 8 }}>
                        Escolha uma senha segura com no minimo 8 caracteres.
                    </p>
                </div>
                <form onSubmit={handleCriarSenha} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Nova senha</label>
                        <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} placeholder="Minimo 8 caracteres"
                            style={loginInput}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Confirmar senha</label>
                        <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} placeholder="Repita a senha"
                            style={loginInput}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }} />
                    </div>
                    {error && <div style={{ fontSize: 13, color: '#ffb4ab', fontWeight: 600 }}>{error}</div>}
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '13px 20px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
                        background: '#fff', color: 'var(--primary)', cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1,
                    }}>
                        {loading ? 'Criando...' : 'Criar senha'}
                    </button>
                </form>
            </>
        );

        if (step === 'confirmar-email') return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'rgba(255,255,255,0.47)', borderRadius: 999, marginBottom: 14 }}>
                        <LogoMark size={20} />
                    </div>
                    <h2 className="serif" style={{ fontSize: 28, margin: 0, color: '#fff' }}>Confirme seu email</h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 8 }}>
                        Enviamos um codigo de 6 digitos para <strong style={{ color: '#fff' }}>{email}</strong>.
                    </p>
                </div>
                <form onSubmit={handleConfirmarEmail} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Codigo de confirmacao</label>
                        <input value={tokenEmail} onChange={(e) => setTokenEmail(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="000000" inputMode="numeric" className="mono"
                            style={{ ...loginInput, letterSpacing: '0.2em', textAlign: 'center', fontSize: 24 }}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }} />
                    </div>
                    {error && <div style={{ fontSize: 13, color: '#ffb4ab', fontWeight: 600 }}>{error}</div>}
                    {msg && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{msg}</div>}
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '13px 20px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
                        background: '#fff', color: 'var(--primary)', cursor: 'pointer', marginTop: 8, opacity: loading ? 0.7 : 1,
                    }}>
                        {loading ? 'Verificando...' : 'Confirmar email'}
                    </button>
                    <button type="button" onClick={handleReenviar} disabled={loading} style={{
                        background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', fontWeight: 600, marginTop: 4,
                    }}>
                        Reenviar codigo
                    </button>
                    <button type="button" onClick={() => { setStep('login'); setError(''); setMsg(''); }} style={{
                        background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer',
                    }}>
                        Voltar ao login
                    </button>
                </form>
            </>
        );

        // Login normal
        return (
            <>
                <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'rgba(255,255,255,0.47)', borderRadius: 999, marginBottom: 14 }}>
                        <LogoMark size={20} />
                    </div>
                    <h2 className="serif" style={{ fontSize: 32, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#fff' }}>
                        Bem-vindo de volta
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 8 }}>
                        Acesse com seu email e senha para continuar.
                    </p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                            placeholder="seu@email.com" style={loginInput}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }} />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Senha</label>
                            <button type="button" onClick={() => setStep('primeiro-acesso')}
                                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                                Primeiro acesso?
                            </button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input type={showPwd ? 'text' : 'password'} value={pwd} onChange={(e) => setPwd(e.target.value)}
                                placeholder="Digite sua senha" style={{ ...loginInput, paddingRight: 40 }}
                                onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }} />
                            <button type="button" onClick={() => setShowPwd((v) => !v)} style={{
                                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                                width: 30, height: 30, border: 'none', background: 'transparent', cursor: 'pointer',
                                color: 'rgba(255,255,255,0.6)', borderRadius: 6, display: 'grid', placeItems: 'center',
                            }}>
                                <Icon name={showPwd ? 'eye-off' : 'eye'} size={16} />
                            </button>
                        </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.75)', cursor: 'pointer', marginTop: 2 }}>
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: '#fff' }} />
                        Manter conectado neste dispositivo
                    </label>

                    {error && <div style={{ fontSize: 13, color: '#ffb4ab', fontWeight: 600 }}>{error}</div>}
                    {msg && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{msg}</div>}

                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '13px 20px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
                        background: '#fff', color: 'var(--primary)', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8,
                        transition: 'opacity .12s', opacity: loading ? 0.7 : 1,
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = loading ? '0.7' : '1'; }}
                    >
                        {loading ? 'Entrando...' : <>Entrar <Icon name="arrow-right" size={16} /></>}
                    </button>
                </form>

                <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                    Ao continuar, voce aceita os <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>Termos</a> e <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>Politica de Privacidade</a>.
                </div>
            </>
        );
    };

    return (
        <>
            {/* ========== DESKTOP ========== */}
            <div className="hide-on-mobile" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{
                    backgroundImage: `url(${bgPattern})`, backgroundSize: '500px auto', backgroundRepeat: 'repeat',
                    backgroundColor: '#fff', padding: '48px 56px', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', right: -120, top: -120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(58,139,90,0.06), transparent 70%)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}><LogoMark size={42} /></div>
                    <div style={{ position: 'relative' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 18 }}>{CLINIC.tagline}</div>
                        <h1 className="serif" style={{ fontSize: 56, lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                            Acompanhe exames,<br />consultas e <em style={{ fontStyle: 'italic' }}>documentos</em>—<br />com tranquilidade.
                        </h1>
                        <p style={{ fontSize: 15, maxWidth: 480, marginTop: 22, color: 'var(--text-2)', lineHeight: 1.55 }}>
                            Tudo o que voce precisa para cuidar de voce e da sua familia, organizado, seguro e disponivel 24 horas.
                        </p>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', gap: 28, fontSize: 13, color: 'var(--text-2)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="shield" size={16} /> LGPD</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="lock" size={16} /> Conexao segura</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check-circle" size={16} /> Certificado ISO</span>
                    </div>
                </div>
                <div style={{
                    background: 'linear-gradient(160deg, var(--hero-grad-1) 0%, var(--hero-grad-2) 60%, var(--hero-grad-3) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', left: -80, bottom: -80, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }} />
                    <div style={{ width: '100%', maxWidth: 380, position: 'relative' }}>{renderForm()}</div>
                </div>
            </div>

            {/* ========== MOBILE ========== */}
            <div className="show-on-mobile" style={{
                minHeight: '100vh', backgroundImage: `url(${bgPattern})`, backgroundSize: '400px auto',
                backgroundRepeat: 'repeat', backgroundColor: '#fff', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '24px 16px',
            }}>
                <div style={{
                    width: '100%', maxWidth: 400,
                    background: 'linear-gradient(160deg, var(--hero-grad-1) 0%, var(--hero-grad-2) 60%, var(--hero-grad-3) 100%)',
                    borderRadius: 20, padding: '28px 24px', boxShadow: '0 16px 48px rgba(30, 77, 49, 0.25)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }} />
                    <div style={{ position: 'absolute', left: -30, bottom: -30, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div style={{ position: 'relative' }}>{renderForm()}</div>
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="shield" size={12} /> LGPD</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="lock" size={12} /> Conexao segura</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="check-circle" size={12} /> Certificado ISO</span>
                </div>
            </div>
        </>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, LogoMark } from '../../../components/ui';
import { CLINIC } from '../../../data/clinic';
import bgPattern from '../../../assets/CIS_patterns_background.jpg';

const formatCpf = (v: string): string => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

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

export function PortalLoginPage() {
    const navigate = useNavigate();
    const [cpf, setCpf] = useState('');
    const [pwd, setPwd] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [remember, setRemember] = useState(true);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/home');
    };

    const loginForm = (
        <>
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'rgba(255,255,255,0.47)', borderRadius: 999, marginBottom: 14 }}>
                    <LogoMark size={20} />
                </div>
                <h2 className="serif" style={{ fontSize: 32, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#fff' }}>
                    Bem-vindo de volta
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 8 }}>
                    Acesse com seu CPF e senha para continuar.
                </p>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>CPF</label>
                    <input
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        style={loginInput}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                    />
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Senha</label>
                        <a href="#" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 12 }}>Esqueci minha senha</a>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPwd ? 'text' : 'password'}
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            placeholder="Digite sua senha"
                            style={{ ...loginInput, paddingRight: 40 }}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                        />
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
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        style={{ accentColor: '#fff' }}
                    />
                    Manter conectado neste dispositivo
                </label>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '13px 20px',
                        border: 'none',
                        borderRadius: 10,
                        fontSize: 15,
                        fontWeight: 600,
                        background: '#fff',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginTop: 8,
                        transition: 'opacity .12s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                >
                    Entrar <Icon name="arrow-right" size={16} />
                </button>
            </form>

            <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                Ao continuar, você aceita os <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>Termos</a> e <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>Política de Privacidade</a>.
            </div>
        </>
    );

    return (
        <>
            {/* ========== DESKTOP ========== */}
            <div className="hide-on-mobile" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                {/* Esquerda — branco com pattern */}
                <div style={{
                    backgroundImage: `url(${bgPattern})`,
                    backgroundSize: '500px auto',
                    backgroundRepeat: 'repeat',
                    backgroundColor: '#fff',
                    padding: '48px 56px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', right: -120, top: -120, width: 460, height: 460,
                        borderRadius: '50%', background: 'radial-gradient(circle, rgba(58,139,90,0.06), transparent 70%)',
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                        <LogoMark size={42} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 18 }}>
                            {CLINIC.tagline}
                        </div>
                        <h1 className="serif" style={{ fontSize: 56, lineHeight: 1.05, margin: 0, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                            Acompanhe exames,<br />consultas e <em style={{ fontStyle: 'italic' }}>documentos</em>—<br />com tranquilidade.
                        </h1>
                        <p style={{ fontSize: 15, maxWidth: 480, marginTop: 22, color: 'var(--text-2)', lineHeight: 1.55 }}>
                            Tudo o que você precisa para cuidar de você e da sua família, organizado, seguro e disponível 24 horas.
                        </p>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', gap: 28, fontSize: 13, color: 'var(--text-2)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="shield" size={16} /> LGPD</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="lock" size={16} /> Conexão segura</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="check-circle" size={16} /> Certificado ISO</span>
                    </div>
                </div>

                {/* Direita — verde com formulário */}
                <div style={{
                    background: 'linear-gradient(160deg, var(--hero-grad-1) 0%, var(--hero-grad-2) 60%, var(--hero-grad-3) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '48px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', left: -80, bottom: -80, width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
                    <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }} />

                    <div style={{ width: '100%', maxWidth: 380, position: 'relative' }}>
                        {loginForm}
                    </div>
                </div>
            </div>

            {/* ========== MOBILE ========== */}
            <div className="show-on-mobile" style={{
                minHeight: '100vh',
                backgroundImage: `url(${bgPattern})`,
                backgroundSize: '400px auto',
                backgroundRepeat: 'repeat',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px 16px',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: 400,
                    background: 'linear-gradient(160deg, var(--hero-grad-1) 0%, var(--hero-grad-2) 60%, var(--hero-grad-3) 100%)',
                    borderRadius: 20,
                    padding: '28px 24px',
                    boxShadow: '0 16px 48px rgba(30, 77, 49, 0.25)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }} />
                    <div style={{ position: 'absolute', left: -30, bottom: -30, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />

                    <div style={{ position: 'relative' }}>
                        {loginForm}
                    </div>
                </div>

                <div style={{ marginTop: 20, display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="shield" size={12} /> LGPD</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="lock" size={12} /> Conexão segura</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="check-circle" size={12} /> Certificado ISO</span>
                </div>
            </div>
        </>
    );
}

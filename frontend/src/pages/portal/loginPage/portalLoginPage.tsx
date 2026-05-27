import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon, LogoMark } from '../../../components/ui';
import { CLINIC } from '../../../data/clinic';
import { useAuth } from '../../../context/AuthContext';
import bgPattern from '../../../assets/CIS_patterns_background.jpg';

// TODO: MODO DESENVOLVIMENTO — reconectar ao backend antes de produção

export function PortalLoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    const handleEntrar = () => {
        const perfil = isAdmin ? 'Admin' : 'Paciente';
        login('dev-token', {
            nome: isAdmin ? 'Administrador' : 'Paciente Teste',
            email: isAdmin ? 'admin@hospital.com' : 'paciente@email.com',
            perfil,
        });
        navigate(isAdmin ? '/admin' : '/home');
    };

    const renderForm = () => (
        <>
            <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 10px 5px 6px', background: 'rgba(255,255,255,0.47)', borderRadius: 999, marginBottom: 14 }}>
                    <LogoMark size={20} />
                </div>
                <h2 className="serif" style={{ fontSize: 32, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#fff' }}>
                    Bem-vindo de volta
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginTop: 8 }}>
                    Selecione o perfil para continuar.
                </p>
            </div>

            {/* Toggle Admin / Paciente */}
            <div style={{
                display: 'flex', borderRadius: 10, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.25)', marginBottom: 20,
            }}>
                <button type="button" onClick={() => setIsAdmin(false)} style={{
                    flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                    fontSize: 14, fontWeight: 600, transition: 'all .15s',
                    background: !isAdmin ? '#fff' : 'rgba(255,255,255,0.08)',
                    color: !isAdmin ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                    <Icon name="user" size={16} /> Paciente
                </button>
                <button type="button" onClick={() => setIsAdmin(true)} style={{
                    flex: 1, padding: '12px 16px', border: 'none', cursor: 'pointer',
                    fontSize: 14, fontWeight: 600, transition: 'all .15s',
                    borderLeft: '1px solid rgba(255,255,255,0.25)',
                    background: isAdmin ? '#fff' : 'rgba(255,255,255,0.08)',
                    color: isAdmin ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                    <Icon name="shield" size={16} /> Admin
                </button>
            </div>

            {/* Info do perfil selecionado */}
            <div style={{
                padding: '14px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.1)', marginBottom: 20,
                fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5,
            }}>
                {isAdmin ? (
                    <>
                        <strong style={{ color: '#fff' }}>Painel Administrativo</strong>
                        <br />Gerenciar pacientes, criar acessos e visualizar dados.
                    </>
                ) : (
                    <>
                        <strong style={{ color: '#fff' }}>Portal do Paciente</strong>
                        <br />Acompanhar exames, consultas e documentos.
                    </>
                )}
            </div>

            <button type="button" onClick={handleEntrar} style={{
                width: '100%', padding: '13px 20px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
                background: '#fff', color: 'var(--primary)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8,
                transition: 'opacity .12s',
            }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.92'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
                Entrar como {isAdmin ? 'Admin' : 'Paciente'} <Icon name="arrow-right" size={16} />
            </button>

            <div style={{ marginTop: 16, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                Modo desenvolvimento — login sem autenticacao
            </div>
        </>
    );

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

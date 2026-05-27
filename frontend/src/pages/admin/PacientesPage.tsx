import { useEffect, useState } from 'react';
import { Card, Button, Icon, Badge, SectionHeader, EmptyState, inputStyle } from '../../components/ui';
import { admin, type PacienteResumo, type PacienteCriado } from '../../services/api';

/* ── Modal de código gerado ── */
function CodigoModal({ data, onClose }: { data: { nome: string; codigo: string; tipo: string }; onClose: () => void }) {
    const [copied, setCopied] = useState(false);
    const copy = () => { navigator.clipboard.writeText(data.codigo); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <div className="modal-title">{data.tipo === 'novo' ? 'Paciente criado!' : 'Acesso resetado!'}</div>
                        <div className="modal-subtitle">Entregue este codigo ao paciente. Ele nao sera exibido novamente.</div>
                    </div>
                    <button className="modal-close" onClick={onClose}><Icon name="x" size={16} /></button>
                </div>

                <div className="modal-body">
                    <div className="modal-row" style={{ flexDirection: 'column', alignItems: 'center', padding: '24px 16px' }}>
                        <div className="modal-label" style={{ marginBottom: 8 }}>Codigo de primeiro acesso</div>
                        <div className="mono" style={{ fontSize: 32, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--primary)' }}>
                            {data.codigo}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 8 }}>
                            Paciente: <strong style={{ color: 'var(--text)' }}>{data.nome}</strong>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button variant="soft" icon="doc" full onClick={copy}>
                            {copied ? 'Copiado!' : 'Copiar codigo'}
                        </Button>
                        <Button variant="primary" full onClick={onClose}>
                            Fechar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Modal de criar paciente ── */
function CriarPacienteModal({ onClose, onCreated }: { onClose: () => void; onCreated: (data: PacienteCriado) => void }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formatCpf = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
        if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(formatCpf(e.target.value));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim() || !email.trim()) { setError('Preencha nome e email.'); return; }
        setLoading(true); setError('');
        try {
            const result = await admin.criarPaciente(
                nome,
                email,
                cpf.trim() || undefined,
                dataNascimento || undefined
            );
            onCreated(result);
        } catch (err: any) {
            setError(err.mensagem || 'Erro ao criar paciente.');
        } finally { setLoading(false); }
    };

    const labelStyle = { display: 'block' as const, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <div className="modal-title">Novo paciente</div>
                        <div className="modal-subtitle">O sistema gerara um codigo de primeiro acesso automaticamente.</div>
                    </div>
                    <button className="modal-close" onClick={onClose}><Icon name="x" size={16} /></button>
                </div>
                <form onSubmit={submit} className="modal-body">
                    <div>
                        <label style={labelStyle}>Nome completo</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Maria da Silva"
                            style={inputStyle()} onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                    </div>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="paciente@email.com"
                            style={inputStyle()} onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={labelStyle}>CPF <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(opcional)</span></label>
                            <input value={cpf} onChange={handleCpfChange} placeholder="000.000.000-00" maxLength={14}
                                style={inputStyle()} onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Data de nascimento <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(opcional)</span></label>
                            <input value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} type="date"
                                style={inputStyle()} onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }} />
                        </div>
                    </div>
                    {error && <div style={{ fontSize: 13, color: 'var(--coral)', fontWeight: 600 }}>{error}</div>}
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <Button variant="secondary" full onClick={onClose}>Cancelar</Button>
                        <Button variant="primary" type="submit" full disabled={loading}>
                            {loading ? 'Criando...' : 'Criar paciente'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ── Linha de paciente ── */
function PacienteRow({ p, onAction }: { p: PacienteResumo; onAction: () => void }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetar = async () => {
        setLoading(true);
        try {
            const result = await admin.resetarAcesso(p.id);
            setMenuOpen(false);
            window.dispatchEvent(new CustomEvent('codigo-gerado', { detail: { nome: p.nome, codigo: result.novoCodigo, tipo: 'reset' } }));
            onAction();
        } finally { setLoading(false); }
    };

    const handleToggle = async () => {
        setLoading(true);
        try {
            if (p.ativo) await admin.desativarPaciente(p.id);
            else await admin.ativarPaciente(p.id);
            setMenuOpen(false);
            onAction();
        } finally { setLoading(false); }
    };

    const statusBadge = () => {
        if (!p.ativo) return <Badge tone="neutral" dot size="sm">Inativo</Badge>;
        if (p.primeiroAcesso) return <Badge tone="amber" dot size="sm">1o Acesso</Badge>;
        if (!p.emailConfirmado) return <Badge tone="coral" dot size="sm">Email pendente</Badge>;
        return <Badge tone="sage" dot size="sm">Ativo</Badge>;
    };

    const initials = p.nome.split(' ').map(n => n[0]).slice(0, 2).join('');
    const date = new Date(p.dataCriacao).toLocaleDateString('pt-BR');

    const cpfDisplay = p.cpf || '—';
    const nascDisplay = p.dataNascimento ? new Date(p.dataNascimento).toLocaleDateString('pt-BR') : '—';

    return (
        <div style={{
            display: 'grid', gridTemplateColumns: '40px 1fr 130px 110px 140px 120px 40px', gap: 14, alignItems: 'center',
            padding: '14px 16px', borderBottom: '1px solid var(--border)', fontSize: 13,
        }}>
            <div style={{
                width: 36, height: 36, borderRadius: 999, background: 'linear-gradient(140deg, #d6deef, #c1cce4)',
                color: 'var(--primary)', fontWeight: 700, fontSize: 13, display: 'grid', placeItems: 'center',
            }}>
                {initials}
            </div>
            <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{p.email}</div>
            </div>
            <div className="hide-on-mobile" style={{ color: 'var(--text-2)', fontSize: 12, fontFamily: 'var(--font-mono, monospace)' }}>{cpfDisplay}</div>
            <div className="hide-on-mobile" style={{ color: 'var(--text-3)', fontSize: 12 }}>{nascDisplay}</div>
            <div className="hide-on-mobile">{statusBadge()}</div>
            <div className="hide-on-mobile" style={{ color: 'var(--text-3)', fontSize: 12 }}>{date}</div>
            <div style={{ position: 'relative' }}>
                <button onClick={() => setMenuOpen(!menuOpen)} style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)',
                    background: 'var(--surface)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--text-2)',
                }}>
                    <Icon name="menu" size={14} />
                </button>
                {menuOpen && (
                    <>
                        <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setMenuOpen(false)} />
                        <div style={{
                            position: 'absolute', right: 0, top: 'calc(100% + 4px)', width: 200,
                            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12,
                            boxShadow: 'var(--shadow-lg)', zIndex: 50, overflow: 'hidden',
                        }}>
                            <button onClick={handleResetar} disabled={loading} style={{
                                width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none',
                                background: 'transparent', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                                color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8,
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                <Icon name="lock" size={15} /> Resetar acesso
                            </button>
                            <button onClick={handleToggle} disabled={loading} style={{
                                width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none',
                                background: 'transparent', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                                color: p.ativo ? 'var(--coral)' : 'var(--sage)', display: 'flex', alignItems: 'center', gap: 8,
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                                <Icon name={p.ativo ? 'x' : 'check-circle'} size={15} />
                                {p.ativo ? 'Desativar' : 'Ativar'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

/* ── Pagina principal ── */
export function PacientesPage() {
    const [pacientes, setPacientes] = useState<PacienteResumo[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCriar, setShowCriar] = useState(false);
    const [codigoData, setCodigoData] = useState<{ nome: string; codigo: string; tipo: string } | null>(null);
    const [search, setSearch] = useState('');

    const load = () => {
        setLoading(true);
        admin.listarPacientes().then(setPacientes).catch(() => {}).finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            setCodigoData(detail);
        };
        window.addEventListener('codigo-gerado', handler);
        return () => window.removeEventListener('codigo-gerado', handler);
    }, []);

    const filtered = pacientes.filter(p => {
        const q = search.toLowerCase();
        return p.nome.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q) ||
            (p.cpf && p.cpf.includes(q));
    });

    return (
        <>
            <SectionHeader
                title="Pacientes"
                subtitle={`${pacientes.length} paciente${pacientes.length !== 1 ? 's' : ''} cadastrado${pacientes.length !== 1 ? 's' : ''}`}
                action={<Button variant="primary" icon="plus-circle" size="sm" onClick={() => setShowCriar(true)}>Novo paciente</Button>}
            />

            {/* Busca */}
            <div style={{ marginBottom: 16, position: 'relative' }}>
                <Icon name="search" size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nome ou email..."
                    style={{ ...inputStyle(), paddingLeft: 40 }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
                />
            </div>

            {/* Tabela */}
            <Card elevated padding={0}>
                {/* Header */}
                <div className="hide-on-mobile" style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr 130px 110px 140px 120px 40px', gap: 14,
                    padding: '10px 16px', fontSize: 11, fontWeight: 600, color: 'var(--text-3)',
                    textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid var(--border)',
                }}>
                    <div />
                    <div>Paciente</div>
                    <div>CPF</div>
                    <div>Nascimento</div>
                    <div>Status</div>
                    <div>Cadastro</div>
                    <div />
                </div>

                {loading ? (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-3)' }}>Carregando...</div>
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon="user"
                        title={search ? 'Nenhum resultado' : 'Nenhum paciente'}
                        body={search ? 'Tente buscar com outros termos.' : 'Clique em "Novo paciente" para cadastrar o primeiro.'}
                        action={!search ? <Button variant="soft" size="sm" icon="plus-circle" onClick={() => setShowCriar(true)}>Criar paciente</Button> : undefined}
                    />
                ) : (
                    filtered.map((p) => <PacienteRow key={p.id} p={p} onAction={load} />)
                )}
            </Card>

            {/* Modais */}
            {showCriar && (
                <CriarPacienteModal
                    onClose={() => setShowCriar(false)}
                    onCreated={(result) => {
                        setShowCriar(false);
                        setCodigoData({ nome: result.nome, codigo: result.codigoAcesso, tipo: 'novo' });
                        load();
                    }}
                />
            )}
            {codigoData && <CodigoModal data={codigoData} onClose={() => setCodigoData(null)} />}
        </>
    );
}

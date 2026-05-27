const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw { status: res.status, ...body };
    }
    return res.json();
}

/* ── Auth ── */
export interface AuthResponse {
    token: string;
    nome: string;
    email: string;
    perfil: string;
    expiracao: string;
}

export const auth = {
    login: (email: string, senha: string) =>
        request<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),

    validarCodigo: (email: string, senha: string) =>
        request<{ primeiroAcesso: boolean; email: string }>('/api/auth/primeiro-acesso/validar', { method: 'POST', body: JSON.stringify({ email, senha }) }),

    criarSenha: (email: string, codigoAcesso: string, novaSenha: string, confirmarSenha: string) =>
        request<{ mensagem: string }>('/api/auth/primeiro-acesso/criar-senha', { method: 'POST', body: JSON.stringify({ email, codigoAcesso, novaSenha, confirmarSenha }) }),

    confirmarEmail: (email: string, token: string) =>
        request<{ mensagem: string }>('/api/auth/confirmar-email', { method: 'POST', body: JSON.stringify({ email, token }) }),

    reenviarConfirmacao: (email: string) =>
        request<{ mensagem: string }>('/api/auth/reenviar-confirmacao', { method: 'POST', body: JSON.stringify({ email }) }),
};

/* ── Admin (localStorage — TODO: reconectar ao backend antes de produção) ── */
export interface PacienteCriado {
    id: string;
    nome: string;
    email: string;
    codigoAcesso: string;
    mensagem: string;
}

export interface PacienteResumo {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    ativo: boolean;
    primeiroAcesso: boolean;
    emailConfirmado: boolean;
    dataCriacao: string;
}

export interface ResetarAcessoResponse {
    id: string;
    nome: string;
    novoCodigo: string;
    mensagem: string;
}

const STORAGE_KEY = 'portal_pacientes';

function getPacientes(): PacienteResumo[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function savePacientes(list: PacienteResumo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function gerarCodigo(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const nums = '23456789';
    const r = (pool: string, n: number) => Array.from({ length: n }, () => pool[Math.floor(Math.random() * pool.length)]).join('');
    return `${r(chars, 3)}-${r(nums, 4)}-${r(chars, 3)}`;
}

export const admin = {
    criarPaciente: async (nome: string, email: string, cpf: string, dataNascimento: string): Promise<PacienteCriado> => {
        const list = getPacientes();
        if (list.some(p => p.email === email)) throw { mensagem: 'Este email ja esta cadastrado.' };
        if (list.some(p => p.cpf === cpf)) throw { mensagem: 'Este CPF ja esta cadastrado.' };

        const codigo = gerarCodigo();
        const novo: PacienteResumo = {
            id: crypto.randomUUID(),
            nome, email, cpf, dataNascimento,
            ativo: true,
            primeiroAcesso: true,
            emailConfirmado: false,
            dataCriacao: new Date().toISOString(),
        };
        list.unshift(novo);
        savePacientes(list);

        return { id: novo.id, nome, email, codigoAcesso: codigo, mensagem: 'Paciente criado com sucesso.' };
    },

    listarPacientes: async (): Promise<PacienteResumo[]> => {
        return getPacientes();
    },

    resetarAcesso: async (id: string): Promise<ResetarAcessoResponse> => {
        const list = getPacientes();
        const p = list.find(p => p.id === id);
        if (!p) throw { mensagem: 'Paciente nao encontrado.' };

        p.primeiroAcesso = true;
        p.emailConfirmado = false;
        savePacientes(list);

        const novoCodigo = gerarCodigo();
        return { id: p.id, nome: p.nome, novoCodigo, mensagem: 'Acesso resetado.' };
    },

    desativarPaciente: async (id: string): Promise<{ mensagem: string }> => {
        const list = getPacientes();
        const p = list.find(p => p.id === id);
        if (!p) throw { mensagem: 'Paciente nao encontrado.' };
        p.ativo = false;
        savePacientes(list);
        return { mensagem: `Paciente ${p.nome} desativado.` };
    },

    ativarPaciente: async (id: string): Promise<{ mensagem: string }> => {
        const list = getPacientes();
        const p = list.find(p => p.id === id);
        if (!p) throw { mensagem: 'Paciente nao encontrado.' };
        p.ativo = true;
        savePacientes(list);
        return { mensagem: `Paciente ${p.nome} ativado.` };
    },
};

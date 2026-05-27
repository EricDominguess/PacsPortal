const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

/* ── Admin ── */
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
    cpf?: string;
    dataNascimento?: string;
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

export const admin = {
    criarPaciente: (nome: string, email: string, cpf?: string, dataNascimento?: string) =>
        request<PacienteCriado>('/api/admin/pacientes', { method: 'POST', body: JSON.stringify({ nome, email, cpf: cpf || undefined, dataNascimento: dataNascimento || undefined }) }),

    listarPacientes: () =>
        request<PacienteResumo[]>('/api/admin/pacientes'),

    resetarAcesso: (id: string) =>
        request<ResetarAcessoResponse>(`/api/admin/pacientes/${id}/resetar-acesso`, { method: 'POST' }),

    desativarPaciente: (id: string) =>
        request<{ mensagem: string }>(`/api/admin/pacientes/${id}/desativar`, { method: 'PATCH' }),

    ativarPaciente: (id: string) =>
        request<{ mensagem: string }>(`/api/admin/pacientes/${id}/ativar`, { method: 'PATCH' }),
};

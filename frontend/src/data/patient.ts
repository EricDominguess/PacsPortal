import type { Completion, LastLogin, Patient } from '../types/portal';

export const PATIENT: Patient = {
    firstName: 'Bruna',
    fullName: 'Bruna Pereira da Silva',
    initials: 'BP',
    email: 'bruna.pereira@email.com',
    phone: '(11) 98123-4567',
};

export const LAST_LOGIN: LastLogin = {
    short: 'Hoje, 09:42',
    device: 'Chrome · São Paulo',
};

export const COMPLETION: Completion = {
    pct: 60,
    done: 3,
    total: 5,
    remaining: 2,
    items: [
        { done: true, title: 'Criar conta', desc: 'Cadastro inicial concluído', cta: 'Concluído' },
        { done: true, title: 'Confirmar e-mail', desc: 'bruna.pereira@email.com verificado', cta: 'Concluído' },
        { done: true, title: 'Confirmar telefone', desc: 'Número validado por SMS', cta: 'Concluído' },
        { done: false, title: 'Adicionar plano de saúde', desc: 'Aumenta a velocidade no atendimento', cta: 'Adicionar' },
        { done: false, title: 'Cadastrar contato de emergência', desc: 'Importante para sua segurança', cta: 'Cadastrar' },
    ],
};

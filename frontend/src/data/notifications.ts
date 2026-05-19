import type { NotificationItem } from '../types/portal';

export const NOTIFICATIONS: NotificationItem[] = [
    { id: 1, title: 'Lembrete: hidrate-se', body: 'Você marcou um exame de sangue para amanhã. Beba bastante água nas próximas 24h.', time: 'Há 2 horas', icon: 'heart', tone: 'sage', read: false },
    { id: 2, title: 'Dra. Marina liberou orientações', body: 'Recomendações para o seu próximo retorno foram adicionadas ao seu prontuário.', time: 'Há 5 horas', icon: 'doc', tone: 'primary', read: false },
    { id: 3, title: 'Atualização de privacidade', body: 'Atualizamos nossos termos de uso e política de dados conforme a LGPD.', time: 'Ontem', icon: 'shield', tone: 'amber', read: true },
    { id: 4, title: 'Bem-vindo ao Portal do Paciente', body: 'Sua conta foi criada com sucesso. Comece explorando o seu dashboard.', time: '3 dias atrás', icon: 'sparkle', tone: 'lavender', read: true },
];

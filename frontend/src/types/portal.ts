export type IconName =
    | 'home' | 'flask' | 'calendar' | 'plus-circle' | 'doc' | 'bell' | 'user' | 'help' | 'logout'
    | 'search' | 'filter' | 'download' | 'share' | 'check' | 'check-circle' | 'clock' | 'alert' | 'info'
    | 'chevron-right' | 'chevron-left' | 'chevron-down' | 'arrow-right' | 'arrow-up-right'
    | 'eye' | 'eye-off' | 'mail' | 'phone' | 'pin' | 'heart' | 'sparkle' | 'menu' | 'x'
    | 'lock' | 'shield' | 'pdf' | 'image' | 'activity' | 'syringe';

export type Tone = 'neutral' | 'primary' | 'sage' | 'amber' | 'coral' | 'lavender';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'soft' | 'danger';
export type ButtonSize = 'sm' | 'md';

export interface Patient {
    firstName: string;
    fullName: string;
    initials: string;
    email: string;
    phone: string;
}

export interface NotificationItem {
    id: number;
    title: string;
    body: string;
    time: string;
    icon: IconName;
    tone: Tone;
    read: boolean;
}

export type ExamStatus = 'disponivel' | 'em_analise' | 'agendado' | 'arquivado';

export interface Exam {
    id: string;
    title: string;
    category: string;
    date: string;
    requested: string;
    lab: string;
    status: ExamStatus;
    new?: boolean;
    attachments: number;
    schedule?: string;
}

export interface CompletionItemModel {
    done: boolean;
    title: string;
    desc: string;
    cta: string;
}

export interface Completion {
    pct: number;
    done: number;
    total: number;
    remaining: number;
    items: CompletionItemModel[];
}

export interface LastLogin {
    short: string;
    device: string;
}

export interface PortalTenant {
    id: string;
    name: string;
    shortName: string;
    initials: string;
    tagline: string;
    vibe: 'institutional' | 'wellness' | 'cardiology' | 'maternity';
    primary: string;
    primaryHover: string;
    primarySoft: string;
    primarySoft2: string;
    logoGradient: [string, string];
    heroGradient: [string, string, string];
    phone: string;
    email: string;
    address: string;
}

export type ScreenId = 'login' | 'home' | 'exames' | 'exame-detalhe' | 'consultas' | 'agendar' | 'documentos' | 'perfil';

export interface NavItem {
    id: ScreenId;
    label: string;
    icon: IconName;
}

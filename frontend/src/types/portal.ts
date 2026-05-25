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

export type ExamStatus = 'disponivel' | 'em_analise' | 'arquivado';

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
    modality?: string;
    bodyPart?: string;
    contrast?: string;
    indication?: string;
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


export type ScreenId = 'login' | 'home' | 'exame-detalhe' | 'perfil';

export interface NavItem {
    id: ScreenId;
    label: string;
    icon: IconName;
}

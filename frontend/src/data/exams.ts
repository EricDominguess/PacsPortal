import type { Exam, ExamStatus, IconName, Tone } from '../types/portal';

export const EXAMS: Exam[] = [
    { id: 'EX-2026-0418', title: 'Hemograma completo', category: 'Sangue', date: '14 Mai 2026', requested: 'Dra. Marina Coelho', lab: 'Lab. Diagnóstica Paulista', status: 'disponivel', new: true, attachments: 2 },
    { id: 'EX-2026-0411', title: 'Colesterol total e frações', category: 'Sangue', date: '14 Mai 2026', requested: 'Dra. Marina Coelho', lab: 'Lab. Diagnóstica Paulista', status: 'disponivel', new: true, attachments: 1 },
    { id: 'EX-2026-0398', title: 'TSH e T4 livre', category: 'Hormônios', date: '14 Mai 2026', requested: 'Dra. Marina Coelho', lab: 'Lab. Diagnóstica Paulista', status: 'em_analise', attachments: 0 },
    { id: 'EX-2026-0367', title: 'Ultrassonografia abdominal', category: 'Imagem', date: '08 Mai 2026', requested: 'Dr. Henrique Sales', lab: 'Centro de Imagem Vital', status: 'agendado', schedule: '21 Mai · 09h30', attachments: 0 },
    { id: 'EX-2026-0312', title: 'Eletrocardiograma', category: 'Cardiologia', date: '02 Mai 2026', requested: 'Dr. André Ferraz', lab: 'Clínica do Coração', status: 'disponivel', attachments: 3 },
    { id: 'EX-2026-0298', title: 'Glicemia em jejum', category: 'Sangue', date: '02 Mai 2026', requested: 'Dra. Marina Coelho', lab: 'Lab. Diagnóstica Paulista', status: 'disponivel', attachments: 1 },
    { id: 'EX-2026-0241', title: 'Raio-X de tórax', category: 'Imagem', date: '18 Abr 2026', requested: 'Dr. Henrique Sales', lab: 'Centro de Imagem Vital', status: 'disponivel', attachments: 2 },
    { id: 'EX-2025-1184', title: 'Ressonância de joelho', category: 'Imagem', date: '12 Dez 2025', requested: 'Dra. Patricia Lemos', lab: 'Centro de Imagem Vital', status: 'arquivado', attachments: 4 },
];

export const EXAM_STATUS: Record<ExamStatus, { label: string; tone: Tone; icon: IconName }> = {
    disponivel: { label: 'Disponível', tone: 'sage', icon: 'check-circle' },
    em_analise: { label: 'Em análise', tone: 'amber', icon: 'clock' },
    agendado: { label: 'Agendado', tone: 'primary', icon: 'calendar' },
    arquivado: { label: 'Arquivado', tone: 'neutral', icon: 'doc' },
};

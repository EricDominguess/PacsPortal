import type { Exam, IconName, Tone } from '../../../types/portal';
import { Badge, Icon } from '../../../components/ui';
import { EXAM_STATUS } from '../../../data/exams';

interface Props {
    exam: Exam;
    onClick: () => void;
}

export function ExamCard({ exam, onClick }: Props) {
    const s = EXAM_STATUS[exam.status];
    const catIcon: IconName = exam.category === 'Imagem' ? 'image'
        : exam.category === 'Cardiologia' ? 'activity'
        : 'flask';
    const catColor: Tone = exam.category === 'Imagem' ? 'lavender'
        : exam.category === 'Cardiologia' ? 'coral'
        : 'amber';

    return (
        <div
            onClick={onClick}
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '16px',
                cursor: 'pointer',
                transition: 'box-shadow .12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Topo: ícone + título + badge novo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `var(--${catColor}-soft)`, color: `var(--${catColor})`,
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                    <Icon name={catIcon} size={16} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{exam.title}</div>
                        {exam.new && <Badge tone="primary" size="sm">Novo</Badge>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
                        {exam.id} · {exam.modality || exam.category}
                    </div>
                </div>
            </div>

            {/* Meio: médico e lab */}
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 10 }}>
                {exam.requested} <span style={{ color: 'var(--text-3)' }}>· {exam.lab}</span>
            </div>

            {/* Rodapé: data à esquerda, status à direita */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{exam.date}</div>
                <Badge tone={s.tone} dot>{s.label}</Badge>
            </div>
        </div>
    );
}
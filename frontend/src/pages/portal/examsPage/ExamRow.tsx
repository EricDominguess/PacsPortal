import type { Exam, IconName, Tone } from '../../../types/portal';
import { Badge, Icon } from '../../../components/ui';
import { EXAM_STATUS } from '../../../data/exams';

interface Props {
    exam: Exam;
    onClick: () => void;
    isLast: boolean;
}

export function ExamRow({ exam, onClick, isLast }: Props) {
    const s = EXAM_STATUS[exam.status];
    const catIcon: IconName = exam.category === 'Imagem' ? 'image'
        : exam.category === 'Cardiologia' ? 'activity'
        : exam.category === 'Hormônios' ? 'flask'
        : 'flask';
    const catColor: Tone = exam.category === 'Imagem' ? 'lavender'
        : exam.category === 'Cardiologia' ? 'coral'
        : exam.category === 'Hormônios' ? 'amber'
        : 'primary';

    return (
        <div
            onClick={onClick}
            className={`exam-row${isLast ? ' exam-row-last' : ''}`}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
            <div className="exam-row-icon" style={{
                width: 40, height: 40, borderRadius: 10,
                background: `var(--${catColor}-soft)`, color: `var(--${catColor})`,
                display: 'grid', placeItems: 'center',
            }}>
                <Icon name={catIcon} size={18} />
            </div>
            <div className="exam-row-main" style={{ minWidth: 0 }}>
                <div className="exam-row-title" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{exam.title}</div>
                    {exam.new && <Badge tone="primary" size="sm">Novo</Badge>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {exam.id} · {exam.modality || exam.category}
                </div>
            </div>
            <div className="exam-row-provider" style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{exam.requested}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{exam.lab}</div>
            </div>
            <div className="exam-row-date">
                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{exam.date}</div>
            </div>
            <div className="exam-row-status">
                <Badge tone={s.tone} dot>{s.label}</Badge>
            </div>
            <div className="exam-row-chevron">
                <Icon name="chevron-right" size={16} style={{ color: 'var(--text-3)' }} />
            </div>
        </div>
    );
}

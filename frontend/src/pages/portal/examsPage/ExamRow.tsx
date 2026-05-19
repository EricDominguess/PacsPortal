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
            style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr 1fr 130px 130px 24px',
                gap: 18, alignItems: 'center',
                padding: '16px 20px',
                borderBottom: isLast ? 'none' : '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'background .12s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-subtle)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
            <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `var(--${catColor}-soft)`, color: `var(--${catColor})`,
                display: 'grid', placeItems: 'center',
            }}>
                <Icon name={catIcon} size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{exam.title}</div>
                    {exam.new && <Badge tone="primary" size="sm">Novo</Badge>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>{exam.id} · {exam.category}</div>
            </div>
            <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{exam.requested}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{exam.lab}</div>
            </div>
            <div>
                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{exam.schedule || exam.date}</div>
                {exam.schedule && <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Agendamento</div>}
            </div>
            <div>
                <Badge tone={s.tone} dot>{s.label}</Badge>
            </div>
            <Icon name="chevron-right" size={16} style={{ color: 'var(--text-3)' }} />
        </div>
    );
}

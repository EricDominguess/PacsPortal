import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exam, ExamStatus } from '../../../types/portal';
import { Button, Card, EmptyState, Icon } from '../../../components/ui';
import { EXAMS } from '../../../data/exams';
import { PortalLayout } from '../layout/PortalLayout';
import { FilterPill } from './FilterPill';
import { ExamRow } from './ExamRow';

type FilterValue = ExamStatus | 'todos';

export function ExamsPage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<FilterValue>('todos');
    const [q, setQ] = useState('');

    const filtered: Exam[] = useMemo(() => {
        let xs: Exam[] = EXAMS;
        if (filter !== 'todos') xs = xs.filter((e) => e.status === filter);
        if (q) xs = xs.filter((e) => (`${e.title} ${e.id} ${e.category} ${e.requested}`).toLowerCase().includes(q.toLowerCase()));
        return xs;
    }, [filter, q]);

    const counts: Record<FilterValue, number> = useMemo(() => ({
        todos: EXAMS.length,
        disponivel: EXAMS.filter((e) => e.status === 'disponivel').length,
        em_analise: EXAMS.filter((e) => e.status === 'em_analise').length,
        agendado: EXAMS.filter((e) => e.status === 'agendado').length,
        arquivado: EXAMS.filter((e) => e.status === 'arquivado').length,
    }), []);

    const openExam = (ex: Exam) => navigate(`/exames/${ex.id}`);

    return (
        <PortalLayout current="exames">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Meus exames</div>
                        <h1 className="serif" style={{ margin: 0, fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                            Resultados e histórico
                        </h1>
                        <div style={{ color: 'var(--text-2)', marginTop: 6, fontSize: 14 }}>{EXAMS.length} exames nos últimos 12 meses</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button variant="secondary" icon="download">Exportar</Button>
                        <Button variant="primary" icon="plus-circle">Agendar exame</Button>
                    </div>
                </div>

                <Card padding={0}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
                        <FilterPill active={filter === 'todos'} onClick={() => setFilter('todos')} count={counts.todos}>Todos</FilterPill>
                        <FilterPill active={filter === 'disponivel'} onClick={() => setFilter('disponivel')} count={counts.disponivel} dot="sage">Disponíveis</FilterPill>
                        <FilterPill active={filter === 'em_analise'} onClick={() => setFilter('em_analise')} count={counts.em_analise} dot="amber">Em análise</FilterPill>
                        <FilterPill active={filter === 'agendado'} onClick={() => setFilter('agendado')} count={counts.agendado} dot="primary">Agendados</FilterPill>
                        <FilterPill active={filter === 'arquivado'} onClick={() => setFilter('arquivado')} count={counts.arquivado} dot="neutral">Arquivados</FilterPill>

                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ position: 'relative' }}>
                                <Icon name="search" size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Buscar"
                                    style={{
                                        padding: '7px 10px 7px 32px',
                                        border: '1px solid var(--border)', borderRadius: 8,
                                        fontSize: 13, outline: 'none', background: 'var(--bg-subtle)',
                                        width: 200,
                                    }}
                                />
                            </div>
                            <Button variant="secondary" size="sm" icon="filter">Filtros</Button>
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <EmptyState icon="search" title="Nada por aqui" body="Tente ajustar os filtros ou termo de busca." />
                    ) : (
                        <div>
                            {filtered.map((ex, i) => (
                                <ExamRow key={ex.id} exam={ex} onClick={() => openExam(ex)} isLast={i === filtered.length - 1} />
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </PortalLayout>
    );
}

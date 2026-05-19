import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Card, Icon } from '../../../components/ui';
import { EXAMS, EXAM_STATUS } from '../../../data/exams';
import { PortalLayout } from '../layout/PortalLayout';
import { Meta } from './Meta';
import { ResultRow } from './ResultRow';
import { Attachment } from './Attachment';
import { Trend } from './Trend';

export function ExamDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const exam = EXAMS.find((e) => e.id === id);

    if (!exam) {
        return (
            <PortalLayout current="exames">
                <div style={{ padding: 40, textAlign: 'center' }}>
                    <h2>Exame não encontrado</h2>
                    <Button variant="primary" icon="chevron-left" onClick={() => navigate('/portal/exames')}>Voltar</Button>
                </div>
            </PortalLayout>
        );
    }

    const s = EXAM_STATUS[exam.status];

    return (
        <PortalLayout current="exames">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-3)' }}>
                    <button
                        onClick={() => navigate('/portal/exames')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-3)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0, fontSize: 13 }}
                    >
                        <Icon name="chevron-left" size={14} /> Exames
                    </button>
                    <span>/</span>
                    <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{exam.id}</span>
                </div>

                <Card padding={28}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <Badge tone={s.tone} dot>{s.label}</Badge>
                                <Badge tone="neutral" size="sm">{exam.category}</Badge>
                                <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>{exam.id}</span>
                            </div>
                            <h1 className="serif" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em' }}>{exam.title}</h1>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 14 }}>
                                <Meta icon="calendar" label="Coletado em" value={exam.date} />
                                <Meta icon="user" label="Solicitado por" value={exam.requested} />
                                <Meta icon="pin" label="Local" value={exam.lab} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start' }}>
                            <Button variant="secondary" icon="share">Compartilhar</Button>
                            <Button variant="primary" icon="download">Baixar PDF</Button>
                        </div>
                    </div>

                    {exam.status === 'disponivel' && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            background: 'var(--sage-soft)', color: 'var(--sage)',
                            padding: '12px 16px', borderRadius: 12, fontSize: 13,
                        }}>
                            <Icon name="check-circle" size={18} />
                            <div>
                                <strong>Resultado liberado.</strong> Os valores foram revisados pelo laboratório responsável. Em caso de dúvidas, fale com o(a) médico(a) solicitante.
                            </div>
                        </div>
                    )}
                </Card>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }} className="row-stack">
                    <Card padding={0}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Resultados</h3>
                            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Faixa de referência indicada</div>
                        </div>
                        <div>
                            <ResultRow name="Hemácias" value="4.8" unit="milhões/mm³" range="4.3 – 5.7" status="ok" />
                            <ResultRow name="Hemoglobina" value="14.2" unit="g/dL" range="13.5 – 17.5" status="ok" />
                            <ResultRow name="Hematócrito" value="42.1" unit="%" range="38 – 50" status="ok" />
                            <ResultRow name="Leucócitos" value="9.800" unit="/mm³" range="4.000 – 11.000" status="ok" />
                            <ResultRow name="Plaquetas" value="385.000" unit="/mm³" range="150.000 – 450.000" status="ok" />
                            <ResultRow name="Glicose" value="112" unit="mg/dL" range="70 – 99" status="high" delta="+13" />
                            <ResultRow name="VCM" value="88" unit="fL" range="80 – 96" status="ok" last />
                        </div>
                    </Card>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Card>
                            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>Anexos</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <Attachment name="Resultado completo.pdf" size="1,2 MB" type="pdf" />
                                <Attachment name="Laudo médico.pdf" size="248 KB" type="pdf" />
                                <Attachment name="Imagem digitalizada.jpg" size="3,4 MB" type="image" />
                            </div>
                        </Card>

                        <Card>
                            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>Histórico do paciente</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <Trend label="Glicose" current="112" prev="98" tone="amber" />
                                <Trend label="Hemoglobina" current="14,2" prev="14,0" tone="sage" />
                                <Trend label="Colesterol total" current="186" prev="201" tone="sage" />
                            </div>
                            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 14, color: 'var(--primary)', fontSize: 13, fontWeight: 700 }}>
                                Ver evolução completa <Icon name="arrow-right" size={14} />
                            </a>
                        </Card>

                        <Card style={{ background: 'var(--primary-soft)', border: '1px solid var(--primary-soft-2)' }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <Icon name="info" size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary)', marginBottom: 4 }}>Importante</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>
                                        Resultados isolados não fecham diagnóstico. Sempre interprete em conjunto com seu(sua) médico(a).
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

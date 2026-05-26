import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Card, Icon } from '../../../components/ui';
import { EXAMS, EXAM_STATUS } from '../../../data/exams';
import { PortalLayout } from '../layout/PortalLayout';
import { Meta } from './Meta';
import { Attachment } from './Attachment';

export function ExamDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const exam = EXAMS.find((e) => e.id === id);

    if (!exam) {
        return (
            <PortalLayout current="exame-detalhe">
                <div style={{ padding: 40, textAlign: 'center' }}>
                    <h2>Exame de imagem nao encontrado</h2>
                    <Button variant="primary" icon="chevron-left" onClick={() => navigate('/home')}>Voltar</Button>
                </div>
            </PortalLayout>
        );
    }

    const s = EXAM_STATUS[exam.status];

    return (
        <PortalLayout current="exame-detalhe">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-3)' }}>
                    <button
                        onClick={() => navigate('/home')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-3)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, padding: 0, fontSize: 13 }}
                    >
                        <Icon name="chevron-left" size={14} /> Home
                    </button>
                    <span>/</span>
                    <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{exam.id}</span>
                </div>

                <Card padding={28}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 18 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <Badge tone={s.tone} dot>{s.label}</Badge>
                                {exam.modality && <Badge tone="neutral" size="sm">{exam.modality}</Badge>}
                                <Badge tone="neutral" size="sm">{exam.bodyPart || exam.category}</Badge>
                                <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>{exam.id}</span>
                            </div>
                            <h1 className="serif" style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.015em' }}>{exam.title}</h1>
                            {exam.indication && (
                                <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-2)' }}>
                                    <strong style={{ color: 'var(--text)' }}>Indicacao clinica:</strong> {exam.indication}
                                </div>
                            )}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 14 }}>
                                <Meta icon="calendar" label="Realizado em" value={exam.date} />
                                <Meta icon="user" label="Solicitado por" value={exam.requested} />
                                <Meta icon="pin" label="Unidade" value={exam.lab} />
                                <Meta icon="image" label="Contraste" value={exam.contrast || 'Nao informado'} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start', flexWrap: 'wrap' }}>
                            <div className="hide-on-mobile">
                                <Button variant="secondary" icon="chevron-left" onClick={() => navigate('/home')}>
                                    Voltar para Home
                                </Button>
                            </div>
                            <Button variant="secondary" icon="eye">Visualizar</Button>
                            <Button variant="secondary" icon="download">Baixar laudo</Button>
                            <Button variant="primary" icon="download">Baixar imagens</Button>
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
                                <strong>Laudo radiologico liberado.</strong> As imagens e o laudo estao prontos para visualizacao e download.
                            </div>
                        </div>
                    )}
                </Card>

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }} className="row-stack">
                    <Card padding={0}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Laudo radiologico</h3>
                            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Resumo clinico</div>
                        </div>
                        <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Indicacao</div>
                                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
                                    {exam.indication || 'Avaliacao de rotina solicitada pelo medico.'}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Achados principais</div>
                                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-2)', fontSize: 14, lineHeight: 1.6 }}>
                                    <li>Estruturas avaliadas sem alteracoes significativas.</li>
                                    <li>Sinais leves compatíveis com processo inflamatorio.</li>
                                    <li>Sem evidencias de lesoes agudas.</li>
                                </ul>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Impressao</div>
                                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
                                    Achados inespecificos. Correlacionar com clinica e acompanhar com seu medico assistente.
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Card>
                            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>Imagens principais</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                                {['Axial', 'Sagital', 'Coronal'].map((label) => (
                                    <div key={label} style={{
                                        borderRadius: 10,
                                        border: '1px solid var(--border)',
                                        background: 'linear-gradient(135deg, var(--bg-subtle), #ffffff)',
                                        minHeight: 72,
                                        display: 'grid',
                                        placeItems: 'center',
                                        color: 'var(--text-3)',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        gap: 6,
                                    }}>
                                        <Icon name="image" size={16} />
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>Arquivos do exame</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <Attachment name="Serie_AX_T2.dcm" size="48 MB" type="dicom" />
                                <Attachment name="Serie_SAG_T1.dcm" size="42 MB" type="dicom" />
                                <Attachment name="Laudo_radiologico.pdf" size="620 KB" type="pdf" />
                            </div>
                        </Card>

                        <Card>
                            <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700 }}>Detalhes tecnicos</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <Meta icon="image" label="Modalidade" value={exam.modality || 'Nao informado'} />
                                <Meta icon="pin" label="Regiao" value={exam.bodyPart || exam.category} />
                                <Meta icon="shield" label="Contraste" value={exam.contrast || 'Nao informado'} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </PortalLayout>
    );
}

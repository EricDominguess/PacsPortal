import type { Tone } from '../../../types/portal';

export type ResultStatus = 'ok' | 'high' | 'low' | 'crit';

interface Props {
    name: string;
    value: string;
    unit: string;
    range: string;
    status: ResultStatus;
    delta?: string;
    last?: boolean;
}

export function ResultRow({ name, value, unit, range, status, delta, last }: Props) {
    const toneMap: Record<ResultStatus, Tone> = { ok: 'sage', high: 'amber', low: 'amber', crit: 'coral' };
    const tone = toneMap[status];
    const [lo, hi] = range.split(' – ').map((s) => parseFloat(s.replace(/[.,]/g, (m) => (m === ',' ? '.' : ''))));
    const v = parseFloat(value.replace(/[.,]/g, (m) => (m === ',' ? '.' : '')));
    const span = hi - lo;
    let pct = ((v - lo) / span) * 100;
    pct = Math.max(-15, Math.min(115, pct));

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1.4fr',
            gap: 24, alignItems: 'center',
            padding: '14px 24px',
            borderBottom: last ? 'none' : '1px solid var(--border)',
        }}>
            <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Referência: {range} {unit}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: status === 'ok' ? 'var(--text)' : `var(--${tone})` }}>{value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{unit}</div>
                {delta && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: `var(--${tone})`, marginLeft: 6 }}>{delta}</span>
                )}
            </div>
            <div style={{ position: 'relative', height: 6, background: 'var(--bg-subtle)', borderRadius: 999 }}>
                <div style={{ position: 'absolute', left: '0%', right: '0%', top: 0, bottom: 0, background: 'var(--sage-soft)', borderRadius: 999 }} />
                <div style={{
                    position: 'absolute', left: `${pct}%`, top: -3,
                    width: 12, height: 12, borderRadius: 999,
                    background: `var(--${tone})`, transform: 'translateX(-6px)',
                    border: '2px solid #fff', boxShadow: '0 0 0 1px var(--border)',
                }} />
            </div>
        </div>
    );
}

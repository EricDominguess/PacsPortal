export function ProgressRing({ pct }: { pct: number }) {
    const r = 22;
    const c = 2 * Math.PI * r;
    return (
        <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={r} stroke="var(--bg-subtle)" strokeWidth="5" fill="none" />
            <circle
                cx="28" cy="28" r={r}
                stroke="var(--primary)" strokeWidth="5" fill="none"
                strokeDasharray={c}
                strokeDashoffset={c - (c * pct) / 100}
                strokeLinecap="round"
                transform="rotate(-90 28 28)"
            />
            <text x="28" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text)">{pct}%</text>
        </svg>
    );
}

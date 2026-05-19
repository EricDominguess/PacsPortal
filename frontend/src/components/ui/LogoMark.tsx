interface LogoMarkProps { size?: number }

export function LogoMark({ size = 36 }: LogoMarkProps) {
    return (
        <div style={{
            width: size, height: size,
            borderRadius: 10,
            background: 'linear-gradient(140deg, var(--logo-grad-start), var(--logo-grad-end))',
            display: 'grid', placeItems: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(var(--primary-rgb), 0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
            position: 'relative',
        }}>
            <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M12 4v16M4 12h16" />
                <circle cx="12" cy="12" r="9" strokeOpacity="0.35" strokeWidth={1.2} />
            </svg>
        </div>
    );
}

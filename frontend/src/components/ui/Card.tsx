import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

interface CardProps {
    children?: ReactNode;
    padding?: number;
    style?: CSSProperties;
    elevated?: boolean;
    hover?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({ children, padding = 24, style = {}, elevated, hover, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding,
                boxShadow: elevated ? 'var(--shadow-sm)' : 'none',
                transition: 'all .18s ease',
                cursor: onClick ? 'pointer' : 'default',
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!hover) return;
                e.currentTarget.style.borderColor = 'var(--border-strong)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
                if (!hover) return;
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = elevated ? 'var(--shadow-sm)' : 'none';
            }}
        >
            {children}
        </div>
    );
}

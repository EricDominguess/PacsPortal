import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import type { ButtonSize, ButtonVariant, IconName } from '../../types/portal';
import { Icon } from './Icon';

interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: IconName;
    iconRight?: IconName;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    full?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
}

export function Button({
    variant = 'primary',
    size = 'md',
    icon,
    iconRight,
    children,
    onClick,
    type = 'button',
    full,
    disabled,
    style: extra = {},
}: ButtonProps) {
    const base: CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontWeight: 600,
        fontSize: size === 'sm' ? 13 : 14,
        padding: size === 'sm' ? '7px 12px' : '10px 16px',
        borderRadius: 10,
        border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all .15s ease',
        width: full ? '100%' : 'auto',
        letterSpacing: '-0.005em',
        opacity: disabled ? 0.55 : 1,
        whiteSpace: 'nowrap',
        ...extra,
    };
    const variants: Record<ButtonVariant, CSSProperties> = {
        primary: { background: 'var(--primary)', color: '#fff', boxShadow: '0 1px 2px rgba(var(--primary-rgb), 0.25), inset 0 1px 0 rgba(255,255,255,0.15)' },
        secondary: { background: '#fff', color: 'var(--text)', borderColor: 'var(--border-strong)' },
        ghost: { background: 'transparent', color: 'var(--text-2)' },
        soft: { background: 'var(--primary-soft)', color: 'var(--primary)' },
        danger: { background: '#fff', color: 'var(--coral)', borderColor: 'var(--coral-soft)' },
    };
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{ ...base, ...variants[variant] }}
            onMouseEnter={(e) => {
                if (disabled) return;
                const t = e.currentTarget;
                if (variant === 'primary') t.style.background = 'var(--primary-hover)';
                if (variant === 'secondary') t.style.background = 'var(--bg-subtle)';
                if (variant === 'ghost') t.style.background = 'var(--bg-subtle)';
                if (variant === 'soft') t.style.background = 'var(--primary-soft-2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = (variants[variant].background as string) || '';
            }}
        >
            {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
            {children}
            {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
        </button>
    );
}

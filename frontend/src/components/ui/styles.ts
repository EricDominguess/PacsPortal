import type { CSSProperties } from 'react';

export const avatarStyle = (size: number = 36): CSSProperties => ({
    width: size,
    height: size,
    borderRadius: 999,
    background: 'linear-gradient(140deg, #d6deef, #c1cce4)',
    color: 'var(--primary)',
    fontWeight: 700,
    fontSize: size * 0.38,
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
});

export const iconBtnStyle = (): CSSProperties => ({
    position: 'relative',
    width: 38,
    height: 38,
    display: 'grid',
    placeItems: 'center',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 10,
    color: 'var(--text-2)',
    cursor: 'pointer',
});

export const popoverStyle = (): CSSProperties => ({
    position: 'absolute',
    right: 0,
    top: 'calc(100% + 8px)',
    width: 240,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden',
    zIndex: 50,
});

export const inputStyle = (): CSSProperties => ({
    width: '100%',
    padding: '11px 14px',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 14,
    background: 'var(--surface)',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color .15s',
});

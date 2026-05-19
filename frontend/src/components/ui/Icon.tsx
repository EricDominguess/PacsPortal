import type { CSSProperties, ReactNode } from 'react';
import type { IconName } from '../../types/portal';

interface IconProps {
    name: IconName;
    size?: number;
    stroke?: number;
    style?: CSSProperties;
}

const iconBaseStyle: CSSProperties = {
    width: 18,
    height: 18,
    strokeWidth: 1.6,
    stroke: 'currentColor',
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

export function Icon({ name, size = 18, stroke = 1.6, style: extra = {} }: IconProps) {
    const s: CSSProperties = { ...iconBaseStyle, width: size, height: size, strokeWidth: stroke, ...extra };
    const p = (d: ReactNode) => <svg viewBox="0 0 24 24" style={s}>{d}</svg>;
    switch (name) {
        case 'home': return p(<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />);
        case 'flask': return p(<><path d="M9 3h6M10 3v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3" /><path d="M7 15h10" /></>);
        case 'calendar': return p(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>);
        case 'plus-circle': return p(<><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>);
        case 'doc': return p(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 14h6M9 17h6M9 11h3" /></>);
        case 'bell': return p(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>);
        case 'user': return p(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>);
        case 'help': return p(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1 1.2-1 1.7M12 17h.01" /></>);
        case 'logout': return p(<><path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5M5 12h11" /></>);
        case 'search': return p(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-5-5" /></>);
        case 'filter': return p(<path d="M3 5h18M6 12h12M10 19h4" />);
        case 'download': return p(<><path d="M12 4v12M7 11l5 5 5-5" /><path d="M5 20h14" /></>);
        case 'share': return p(<><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8 11l8-4M8 13l8 4" /></>);
        case 'check': return p(<path d="M4 12l5 5 11-12" />);
        case 'check-circle': return p(<><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>);
        case 'clock': return p(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
        case 'alert': return p(<><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></>);
        case 'info': return p(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>);
        case 'chevron-right': return p(<path d="M9 6l6 6-6 6" />);
        case 'chevron-left': return p(<path d="M15 6l-6 6 6 6" />);
        case 'chevron-down': return p(<path d="M6 9l6 6 6-6" />);
        case 'arrow-right': return p(<path d="M5 12h14M13 6l6 6-6 6" />);
        case 'arrow-up-right': return p(<path d="M7 17 17 7M9 7h8v8" />);
        case 'eye': return p(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>);
        case 'eye-off': return p(<><path d="M3 3l18 18" /><path d="M10.6 6.2A10 10 0 0 1 12 6c6 0 10 6 10 6a16 16 0 0 1-3.2 3.6M6.6 7A16 16 0 0 0 2 12s4 6 10 6c1.6 0 3-.3 4.3-.9" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>);
        case 'mail': return p(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></>);
        case 'phone': return p(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
        case 'pin': return p(<><path d="M12 22s7-7 7-13a7 7 0 1 0-14 0c0 6 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>);
        case 'heart': return p(<path d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11z" transform="translate(-1 0)" />);
        case 'sparkle': return p(<path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />);
        case 'menu': return p(<path d="M3 6h18M3 12h18M3 18h18" />);
        case 'x': return p(<path d="M6 6l12 12M18 6L6 18" />);
        case 'lock': return p(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>);
        case 'shield': return p(<path d="M12 3l8 3v5c0 5-4 9-8 10-4-1-8-5-8-10V6z" />);
        case 'pdf': return p(
            <>
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <text x="7.5" y="17.5" style={{ font: '600 5.5px sans-serif', stroke: 'none', fill: 'currentColor' } as CSSProperties}>PDF</text>
            </>
        );
        case 'image': return p(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M21 16l-5-5-9 9" /></>);
        case 'activity': return p(<path d="M3 12h4l3-8 4 16 3-8h4" />);
        case 'syringe': return p(<><path d="m18 2 4 4M16 4l4 4M9 11l4 4M14 8l2-2 4 4-2 2M3 21l4-1 7-7-3-3-7 7-1 4z" /></>);
        default: return p(<circle cx="12" cy="12" r="2" />);
    }
}

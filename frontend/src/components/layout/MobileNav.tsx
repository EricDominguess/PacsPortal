import type { ScreenId } from '../../types/portal';
import { Icon } from '../ui';
import { NAV_ITEMS } from './navItems';

interface Props {
    current: ScreenId;
    onNavigate: (id: ScreenId) => void;
}

export function MobileNav({ current, onNavigate }: Props) {
    return (
        <nav className="mobile-nav show-on-mobile" aria-label="Navegacao principal">
            {NAV_ITEMS.map((item) => {
                const active = current === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className="mobile-nav-item"
                        aria-current={active ? 'page' : undefined}
                    >
                        <Icon name={item.icon} size={18} stroke={active ? 1.9 : 1.6} />
                        <span className="mobile-nav-label">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}

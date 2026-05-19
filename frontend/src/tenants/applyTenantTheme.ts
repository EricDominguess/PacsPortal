import type { PortalTenant } from '../types/portal';

const hexToRgb = (hex: string): string => {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
    return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

export const applyTenantTheme = (tenant: PortalTenant): void => {
    const root = document.documentElement;
    root.style.setProperty('--primary', tenant.primary);
    root.style.setProperty('--primary-hover', tenant.primaryHover);
    root.style.setProperty('--primary-soft', tenant.primarySoft);
    root.style.setProperty('--primary-soft-2', tenant.primarySoft2);
    root.style.setProperty('--primary-rgb', hexToRgb(tenant.primary));
    root.style.setProperty('--logo-grad-start', tenant.logoGradient[0]);
    root.style.setProperty('--logo-grad-end', tenant.logoGradient[1]);
    root.style.setProperty('--hero-grad-1', tenant.heroGradient[0]);
    root.style.setProperty('--hero-grad-2', tenant.heroGradient[1]);
    root.style.setProperty('--hero-grad-3', tenant.heroGradient[2]);
    document.title = `${tenant.name} — Portal do Paciente`;
};

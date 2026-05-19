import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PortalTenant } from '../types/portal';
import { TENANTS } from './tenants';
import { applyTenantTheme } from './applyTenantTheme';

interface ContextValue {
    tenant: PortalTenant;
    tenantId: string;
    setTenantId: (id: string) => void;
    tenants: PortalTenant[];
}

const PortalTenantContext = createContext<ContextValue | undefined>(undefined);

const STORAGE_KEY = 'pp:tenant';

export function PortalTenantProvider({ children }: { children: ReactNode }) {
    const [tenantId, setTenantIdState] = useState<string>(TENANTS[0].id);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && TENANTS.some((t) => t.id === saved)) setTenantIdState(saved);
    }, []);

    const tenant = useMemo(
        () => TENANTS.find((t) => t.id === tenantId) || TENANTS[0],
        [tenantId],
    );

    useEffect(() => {
        applyTenantTheme(tenant);
    }, [tenant]);

    const setTenantId = (id: string) => {
        setTenantIdState(id);
        localStorage.setItem(STORAGE_KEY, id);
    };

    const value = useMemo(
        () => ({ tenant, tenantId, setTenantId, tenants: TENANTS }),
        [tenant, tenantId],
    );

    return <PortalTenantContext.Provider value={value}>{children}</PortalTenantContext.Provider>;
}

export function usePortalTenant() {
    const ctx = useContext(PortalTenantContext);
    if (!ctx) throw new Error('usePortalTenant must be used inside PortalTenantProvider');
    return ctx;
}

export function useTenant(): PortalTenant {
    return usePortalTenant().tenant;
}

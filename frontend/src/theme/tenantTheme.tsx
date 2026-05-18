import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export type TenantTheme = {
    id: string;
    name: string;
    portalName: string;
    brandMark: string;
    logoUrl?: string;
    colors: {
        primary: string;
        primaryDark: string;
        primarySoft: string;
        accent: string;
    };
};

const defaultTheme: TenantTheme = {
    id: "default",
    name: "BitPACS",
    portalName: "Portal do Paciente",
    brandMark: "BP",
    colors: {
        primary: "#2563EB",
        primaryDark: "#1D4ED8",
        primarySoft: "#DBEAFE",
        accent: "#3B82F6",
    },
};

const tenantThemes: Array<TenantTheme & { domains: string[] }> = [
    {
        ...defaultTheme,
        domains: [],
    },
    {
        id: "santa-saude",
        name: "Santa Saúde",
        portalName: "Portal do Paciente",
        brandMark: "SS",
        logoUrl: "/tenant-logos/santa-saude.svg",
        colors: {
            primary: "#0F766E",
            primaryDark: "#0B4F4A",
            primarySoft: "#CCFBF1",
            accent: "#14B8A6",
        },
        domains: ["santasaude.com.br"],
    },
    {
        id: "hospital-vida",
        name: "Hospital Vida",
        portalName: "Portal Vida",
        brandMark: "HV",
        logoUrl: "/tenant-logos/hospital-vida.svg",
        colors: {
            primary: "#7C3AED",
            primaryDark: "#5B21B6",
            primarySoft: "#EDE9FE",
            accent: "#8B5CF6",
        },
        domains: ["hospitalvida.com.br"],
    },
    {
        id: "clinica-nova",
        name: "Clínica Nova",
        portalName: "Portal do Paciente",
        brandMark: "CN",
        logoUrl: "/tenant-logos/clinica-nova.svg",
        colors: {
            primary: "#DC2626",
            primaryDark: "#B91C1C",
            primarySoft: "#FEE2E2",
            accent: "#EF4444",
        },
        domains: ["clinicanova.com"],
    },
];

const getThemeById = (id: string | null) => {
    if (!id) return defaultTheme;
    return tenantThemes.find((theme) => theme.id === id) ?? defaultTheme;
};

const emailTenantMap: Record<string, string> = {
    "joao.silva@gmail.com": "santa-saude",
    "maria.pereira@hotmail.com": "hospital-vida",
    "ana.costa@yahoo.com": "clinica-nova",
};

const getThemeByEmail = (email: string) => {
    const normalized = email.trim().toLowerCase();
    const mappedId = emailTenantMap[normalized];
    if (mappedId) return getThemeById(mappedId);

    const domain = normalized.split("@")[1];
    if (!domain) return defaultTheme;
    return tenantThemes.find((theme) => theme.domains.includes(domain)) ?? defaultTheme;
};

type TenantThemeContextValue = {
    theme: TenantTheme;
    applyThemeFromEmail: (email: string) => void;
    resetTheme: () => void;
};

const TenantThemeContext = createContext<TenantThemeContextValue | undefined>(undefined);

export function TenantThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<TenantTheme>(defaultTheme);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = window.localStorage.getItem("tenantThemeId");
        setTheme(getThemeById(saved));
    }, []);

    const applyThemeFromEmail = useCallback((email: string) => {
        const resolved = getThemeByEmail(email);
        setTheme(resolved);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("tenantThemeId", resolved.id);
        }
    }, []);

    const resetTheme = useCallback(() => {
        setTheme(defaultTheme);
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("tenantThemeId");
        }
    }, []);

    const value = useMemo(
        () => ({
            theme,
            applyThemeFromEmail,
            resetTheme,
        }),
        [theme, applyThemeFromEmail, resetTheme]
    );

    return <TenantThemeContext.Provider value={value}>{children}</TenantThemeContext.Provider>;
}

export function useTenantTheme() {
    const context = useContext(TenantThemeContext);
    if (!context) {
        throw new Error("useTenantTheme must be used within TenantThemeProvider");
    }
    return context;
}

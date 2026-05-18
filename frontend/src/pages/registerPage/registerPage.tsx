

import { useState, type CSSProperties } from "react";
import { useTenantTheme } from "../../theme/tenantTheme";

export function RegisterPage() {
    const [email, setEmail] = useState("");
    const { theme, applyThemeFromEmail } = useTenantTheme();

    const tenantStyles = {
        "--tenant-primary": theme.colors.primary,
        "--tenant-primary-dark": theme.colors.primaryDark,
        "--tenant-primary-soft": theme.colors.primarySoft,
        "--tenant-accent": theme.colors.accent,
    } as CSSProperties;

    return (
        <div
            className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900"
            style={tenantStyles}
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-cyan-200/40 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
                <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--tenant-primary)] text-sm font-semibold text-white">
                                {theme.brandMark}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{theme.portalName}</p>
                                <p className="text-xs text-slate-500">{theme.name}</p>
                            </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-[color:var(--tenant-primary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--tenant-primary)] shadow-sm">
                            Cadastro do paciente
                        </span>
                        <h1 className="text-4xl font-bold leading-tight">Crie sua conta</h1>
                        <p className="text-base text-slate-600">
                            Complete seu cadastro para acessar exames e acompanhar seu histórico.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-semibold">Registrar</h2>
                        <p className="mt-1 text-sm text-slate-500">Preencha seus dados para criar acesso.</p>

                        <form className="mt-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Nome completo</label>
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    onBlur={() => applyThemeFromEmail(email)}
                                    placeholder="seuemail@exemplo.com"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">Confirmar senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[color:var(--tenant-primary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[color:var(--tenant-primary-dark)]"
                            >
                                Criar conta
                            </button>
                            <button
                                type="button"
                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary)]"
                            >
                                Já tenho conta
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
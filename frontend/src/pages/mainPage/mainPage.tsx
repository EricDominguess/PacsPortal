

import { useTenantTheme } from "../../theme/tenantTheme";
import type { CSSProperties } from "react";

export function MainPage() {
    const { theme } = useTenantTheme();

    const tenantStyles = {
        "--tenant-primary": theme.colors.primary,
        "--tenant-primary-dark": theme.colors.primaryDark,
        "--tenant-primary-soft": theme.colors.primarySoft,
        "--tenant-accent": theme.colors.accent,
    } as CSSProperties;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900" style={tenantStyles}>
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--tenant-primary)] text-sm font-semibold text-white">
                            {theme.brandMark}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">{theme.portalName}</p>
                            <p className="text-xs text-slate-500">Área do cliente</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary)]">
                            Ajuda
                        </button>
                        <button className="rounded-lg bg-[color:var(--tenant-primary)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--tenant-primary-dark)]">
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-6xl px-6 py-8">
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-2xl font-semibold">Olá, paciente</h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Aqui você encontra seus exames e histórico de acessos.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button className="rounded-lg bg-[color:var(--tenant-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--tenant-primary-dark)]">
                                Ver exames
                            </button>
                            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary)]">
                                Atualizar dados
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs uppercase text-slate-500">Exames disponíveis</p>
                        <p className="mt-2 text-2xl font-semibold">0</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs uppercase text-slate-500">Último acesso</p>
                        <p className="mt-2 text-2xl font-semibold">—</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs uppercase text-slate-500">Solicitações</p>
                        <p className="mt-2 text-2xl font-semibold">0</p>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Meus exames</h2>
                        <button className="text-sm font-semibold text-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary-dark)]">
                            Ver todos
                        </button>
                    </div>
                    <div className="mt-4 rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                        Nenhum exame disponível no momento.
                    </div>
                </section>
            </main>
        </div>
    );
}
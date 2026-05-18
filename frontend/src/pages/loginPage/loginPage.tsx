

import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useTenantTheme } from "../../theme/tenantTheme";

export function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const { theme, applyThemeFromEmail } = useTenantTheme();

    const isEmailValid = email.includes("@");

    const confirmEmail = () => {
        if (!isEmailValid) return;
        applyThemeFromEmail(email);
        setEmailConfirmed(true);
    };

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
            {/* Background decorativo */}
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
                            Acesso do paciente
                        </span>
                        <h1 className="text-4xl font-bold leading-tight">Bem-vindo de volta</h1>
                        <p className="text-base text-slate-600">
                            Acesse seus exames com segurança e praticidade. Use seu e-mail e senha para entrar.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[color:var(--tenant-accent)]" />
                                Visualização rápida e organizada
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[color:var(--tenant-accent)]" />
                                Dados protegidos conforme LGPD
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[color:var(--tenant-accent)]" />
                                Suporte sempre que precisar
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-semibold">Entrar</h2>
                        <p className="mt-1 text-sm text-slate-500">Digite seus dados para acessar o portal.</p>

                        <form
                            className="mt-6 space-y-4"
                            onSubmit={(event) => {
                                if (!emailConfirmed) {
                                    event.preventDefault();
                                    confirmEmail();
                                }
                            }}
                        >
                            <div>
                                <label className="text-sm font-medium text-slate-700">E-mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    onBlur={confirmEmail}
                                    placeholder="seuemail@exemplo.com"
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
                                />
                            </div>
                            {!emailConfirmed && (
                                <button
                                    type="button"
                                    onClick={confirmEmail}
                                    className="w-full rounded-lg bg-[color:var(--tenant-primary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[color:var(--tenant-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={!isEmailValid}
                                >
                                    Continuar
                                </button>
                            )}

                            {emailConfirmed && (
                                <>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Senha</label>
                                        <div className="relative mt-2">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 pr-11 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((value) => !value)}
                                                className="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:text-slate-700"
                                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                            >
                                                {showPassword ? (
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 3l18 18M10.477 10.484a3 3 0 104.243 4.243M9.88 4.24A9.956 9.956 0 0112 4c4.418 0 8.205 2.92 9.543 7-.335 1.02-.86 1.97-1.542 2.8M6.228 6.228A9.953 9.953 0 002.457 11C3.795 15.08 7.582 18 12 18c1.385 0 2.71-.287 3.91-.804"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.457 11C3.795 6.92 7.582 4 12 4c4.418 0 8.205 2.92 9.543 7-1.338 4.08-5.125 7-9.543 7-4.418 0-8.205-2.92-9.543-7z"
                                                        />
                                                        <circle cx="12" cy="11" r="3" strokeWidth="2" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 text-slate-600">
                                            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                                            Lembrar-me
                                        </label>
                                        <button
                                            type="button"
                                            className="font-medium text-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary-dark)]"
                                        >
                                            Esqueci minha senha
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-[color:var(--tenant-primary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[color:var(--tenant-primary-dark)]"
                                    >
                                        Entrar
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary)]"
                                    >
                                        Criar conta
                                    </button>
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/forgot-password")}
                                            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                        >
                                            ← Recuperar senha
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/register")}
                                            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                        >
                                            Registrar →
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/main")}
                                            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                        >
                                            Main →
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="rounded-lg border border-slate-200 bg-blue-50/40 px-4 py-3 text-xs text-slate-600 text-center">
                                Ao entrar, você concorda com os termos de uso e política de privacidade.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
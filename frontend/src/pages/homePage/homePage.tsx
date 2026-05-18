import { useState } from "react";
import CardSuport from "../../components/cardSuport";

export function HomePage() {
    const [showCardSuport, setShowCardSuport] = useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            {/* Background decorativo */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {/* Glow principal */}
                <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-300/30 blur-3xl" />
                {/* Glow secundário */}
                <div className="absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 rounded-full bg-cyan-200/40 blur-3xl" />
                {/* Grid sutil */}
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                    }}
                />
                {/* Vinheta leve */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />
            </div>

            <header className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-2">
                <div>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
                        Portal do Paciente
                    </span>
                    <h1 className="mt-4 text-4xl font-bold leading-tight">
                        Seus exames de imagem, sempre à mão
                    </h1>
                    <p className="mt-3 text-base text-slate-600">
                        Acesse, visualize e baixe seus exames com segurança, rapidez e comodidade.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700">
                            Acessar meus exames
                        </button>
                        <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-blue-300 hover:text-blue-600">
                            Como acessar
                        </button>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        Seus dados são tratados com confidencialidade e conforme a LGPD.
                    </p>
                </div>

                <div className="relative h-64 w-full">
                    <div className="absolute inset-0 z-0 rounded-2xl border border-slate-200 bg-slate-100" />
                    <div className="absolute inset-4 z-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                        <img
                            className="h-full w-full object-cover"
                            alt="Paciente visualizando exame de imagem"
                            src="/hero-xray.jpg"
                        />
                    </div>
                </div>
            </header>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-12">
                <h2 className="text-2xl font-semibold">Vantagens do Portal</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h3 className="font-semibold">Segurança</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Seus dados protegidos com acesso individual e criptografado.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h3 className="font-semibold">Agilidade</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Consulte seus exames a qualquer hora, de qualquer lugar.
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <h3 className="font-semibold">Clareza</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Visualização simples, organizada e fácil de usar.
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-12">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold">Como funciona</h2>
                    <ol className="mt-3 list-decimal pl-5 text-sm text-slate-600">
                        <li>Receba seu link de acesso</li>
                        <li>Faça login com segurança</li>
                        <li>Visualize e baixe seus exames</li>
                    </ol>
                </div>
            </section>

            <section className="relative mx-auto w-full max-w-6xl px-6 pb-16">
                <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm md:flex-row md:items-center">
                    <div>
                        <h2 className="text-2xl font-semibold">Precisa de ajuda?</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Se tiver dificuldades, nossa equipe está pronta para ajudar.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCardSuport(true)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700">
                        Falar com suporte
                    </button>
                </div>
            </section>
            <CardSuport isOpen={showCardSuport} onClose={() => setShowCardSuport(false)} />
        </div>
    );
}


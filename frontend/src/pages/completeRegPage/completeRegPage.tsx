import { useState, type CSSProperties } from "react";
import { useTenantTheme } from "../../theme/tenantTheme";

export function CompleteRegPage() {
	const { theme } = useTenantTheme();
	const [cpf, setCpf] = useState("");
	const [phone, setPhone] = useState("");
	const [cep, setCep] = useState("");
	const [emergencyPhone, setEmergencyPhone] = useState("");

	const formatDigits = (value: string) => value.replace(/\D/g, "");
	const formatCpf = (value: string) => {
		const digits = formatDigits(value).slice(0, 11);
		return digits
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
	};
	const formatCep = (value: string) => {
		const digits = formatDigits(value).slice(0, 8);
		return digits.replace(/(\d{5})(\d)/, "$1-$2");
	};
	const formatPhone = (value: string) => {
		const digits = formatDigits(value).slice(0, 11);
		if (digits.length <= 10) {
			return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
		}
		return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
	};

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
							<p className="text-xs text-slate-500">{theme.name}</p>
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
				<div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div>
							<h1 className="text-2xl font-semibold">Complete seu cadastro</h1>
							<p className="mt-1 text-sm text-slate-600">
								Precisamos de algumas informações para liberar seu acesso completo.
							</p>
						</div>
						<div className="flex items-center gap-2 text-xs text-slate-500">
							<span className="rounded-full bg-[color:var(--tenant-primary-soft)] px-3 py-1 font-semibold text-[color:var(--tenant-primary)]">
								Passo 2 de 3
							</span>
							<span className="hidden h-1 w-24 rounded-full bg-slate-200 md:block">
								<span className="block h-1 w-2/3 rounded-full bg-[color:var(--tenant-primary)]" />
							</span>
						</div>
					</div>
				</div>

				<form className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
					<div className="space-y-6">
						<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold">Dados pessoais</h2>
							<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="md:col-span-2">
									<label className="text-sm font-medium text-slate-700">Nome completo</label>
									<input
										type="text"
										placeholder="Seu nome"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">CPF</label>
									<input
										type="text"
										value={cpf}
										onChange={(event) => setCpf(formatCpf(event.target.value))}
										placeholder="000.000.000-00"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Data de nascimento</label>
									<input
										type="date"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Telefone</label>
									<input
										type="tel"
										value={phone}
										onChange={(event) => setPhone(formatPhone(event.target.value))}
										placeholder="(00) 00000-0000"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Gênero</label>
									<select className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]">
										<option>Selecione</option>
										<option>Feminino</option>
										<option>Masculino</option>
										<option>Prefiro não informar</option>
									</select>
								</div>
							</div>
						</section>

						<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold">Endereço</h2>
							<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
								<div>
									<label className="text-sm font-medium text-slate-700">CEP</label>
									<input
										type="text"
										value={cep}
										onChange={(event) => setCep(formatCep(event.target.value))}
										placeholder="00000-000"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="text-sm font-medium text-slate-700">Endereço</label>
									<input
										type="text"
										placeholder="Rua, número"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Cidade</label>
									<input
										type="text"
										placeholder="Cidade"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Estado</label>
									<input
										type="text"
										placeholder="UF"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Complemento</label>
									<input
										type="text"
										placeholder="Apartamento, bloco, etc."
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
							</div>
						</section>

						<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
							<h2 className="text-lg font-semibold">Contato de emergência</h2>
							<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
								<div>
									<label className="text-sm font-medium text-slate-700">Nome</label>
									<input
										type="text"
										placeholder="Nome do contato"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
								<div>
									<label className="text-sm font-medium text-slate-700">Telefone</label>
									<input
										type="tel"
										value={emergencyPhone}
										onChange={(event) => setEmergencyPhone(formatPhone(event.target.value))}
										placeholder="(00) 00000-0000"
										className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[color:var(--tenant-primary)] focus:ring-2 focus:ring-[color:var(--tenant-primary-soft)]"
									/>
								</div>
							</div>
						</section>
					</div>

					<aside className="space-y-4">
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<h3 className="text-sm font-semibold">Dicas rápidas</h3>
							<ul className="mt-3 space-y-2 text-sm text-slate-600">
								<li>• Informe os dados exatamente como no documento.</li>
								<li>• Seu CPF será usado para validar o acesso.</li>
								<li>• Esses dados ajudam no atendimento.</li>
							</ul>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<h3 className="text-sm font-semibold">Termos</h3>
							<p className="mt-2 text-sm text-slate-600">
								Ao concluir, você concorda com a política de privacidade e tratamento de dados.
							</p>
						</div>
						<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<button
								type="submit"
								className="w-full rounded-lg bg-[color:var(--tenant-primary)] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[color:var(--tenant-primary-dark)]"
							>
								Salvar e continuar
							</button>
							<button
								type="button"
								className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[color:var(--tenant-primary)] hover:text-[color:var(--tenant-primary)]"
							>
								Salvar e sair
							</button>
						</div>
					</aside>
				</form>
			</main>
		</div>
	);
}

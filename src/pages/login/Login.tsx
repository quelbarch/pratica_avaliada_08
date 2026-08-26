import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { AuthContext } from "../../contexts/AuthContext"
import type UsuarioLogin from "../../models/UsuarioLogin"

function Login() {
	const { handleLogin, isLoading } = useContext(AuthContext)

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
		{} as UsuarioLogin
	)

	function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value
		})
	}

	function login(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		handleLogin(usuarioLogin)
	}

	return (
		<main className="grid min-h-screen grid-cols-1 place-items-center bg-nexus font-bold lg:grid-cols-2">
			<div className="flex w-full justify-center px-6 sm:px-8">
				<form
					onSubmit={login}
					className="flex w-full max-w-sm flex-col items-center gap-4 py-10 lg:py-3"
				>
					<h2 className="font-display text-center text-3xl text-white sm:text-4xl lg:text-5xl">
						Entrar
					</h2>

					<div className="flex w-full flex-col gap-2">
						<label htmlFor="usuario" className="text-slate-200">Usuário</label>
						<input
							type="email"
							id="usuario"
							name="usuario"
							placeholder="Usuário"
							required
							className="w-full rounded-xl border border-white/10 bg-[#0B0F17] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							value={usuarioLogin.usuario || ''}
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex w-full flex-col gap-2">
						<label htmlFor="senha" className="text-slate-200">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							required
							className="w-full rounded-xl border border-white/10 bg-[#0B0F17] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							value={usuarioLogin.senha || ''}
							onChange={atualizarEstado}
						/>
					</div>

					<button
						type="submit"
						className="flex w-full items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-violet-500 py-2.5 font-display font-semibold text-white transition-opacity hover:opacity-90 sm:w-2/3"
					>
						{isLoading ? (
							<div className="flex h-6 w-6 items-center justify-center">
								<RotatingLines
									strokeColor="white"
									strokeWidth="5"
									animationDuration="0.75"
									width="24"
									visible={true}
								/>
							</div>
						) : (
							<span>Entrar</span>
						)}
					</button>

					<hr className="w-full border-white/10" />

					<p className="text-center text-slate-300">
						Ainda não tem uma conta?{" "}
						<Link to="/cadastro" className="text-cyan-400 hover:underline">
							Cadastre-se
						</Link>
					</p>
				</form>
			</div>

			<section
				aria-label="Imagem ilustrativa de fundo"
				className="relative hidden min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:block bg-[url('https://i.imgur.com/2jDMgHn.jpg')]"
			>
				<div className="absolute inset-0 bg-linear-to-t from-[#05070D] via-[#05070D]/40 to-[#05070D]/10" />
				<div className="absolute inset-0 bg-linear-to-r from-[#05070D]/70 via-transparent to-transparent" />

				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="animate-scan absolute left-0 h-24 w-full bg-linear-to-b from-transparent via-cyan-400/10 to-transparent" />
				</div>

				<div className="absolute inset-8 pointer-events-none">
					<span className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-cyan-400/60" />
					<span className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-cyan-400/60" />
					<span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-400/60" />
					<span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-400/60" />
				</div>

				<div className="absolute inset-x-10 bottom-16 z-10">
					<span className="inline-block rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
						⚡ GAME STORE · NEXT-GEN
					</span>
					<h2 className="mt-4 font-display text-4xl font-bold text-white drop-shadow-lg">
						Entre no futuro dos <span className="text-gradient-brand">games.</span>
					</h2>
					<p className="mt-2 max-w-xs text-sm text-slate-300">
						Explore, compare e monte sua biblioteca com um toque.
					</p>
				</div>
			</section>
		</main>
	)
}

export default Login
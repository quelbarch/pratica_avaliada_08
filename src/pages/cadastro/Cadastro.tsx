import dayjs from "dayjs"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RotatingLines } from "react-loader-spinner"
import { toast } from "react-toastify"
import { cadastrarUsuario } from "../../services/Service"
import type Usuario from "../../models/Usuario"

function Cadastro() {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [confirmarSenha, setConfirmarSenha] = useState('')
	const [usuario, setUsuario] = useState<Usuario>({} as Usuario)

	function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
		setUsuario({ ...usuario, [e.target.name]: e.target.value })
	}

	function retornar() {
		navigate('/')
	}

	async function cadastrarNovoUsuario(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!usuario.senha || usuario.senha.length < 8) {
			toast.warn('A senha deve ter no mínimo 8 caracteres!')
			return
		}

		if (usuario.senha !== confirmarSenha) {
			toast.warn('As senhas não coincidem!')
			return
		}

		if (!usuario.dataNascimento) {
			toast.warn('Informe a data de nascimento!')
			return
		}

		const idade = dayjs().diff(dayjs(usuario.dataNascimento), 'year')
		if (idade < 18) {
			toast.warn('É necessário ter 18 anos ou mais para se cadastrar!')
			return
		}

		const fotoRegex = /^https?:\/\/.+/i
		if (usuario.foto && !fotoRegex.test(usuario.foto)) {
			toast.warn('Se preenchido, o campo Foto deve ser uma URL válida (começando com http:// ou https://)')
			return
		}

		setIsLoading(true)
		try {
			await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario)
			toast.success('Usuário cadastrado com sucesso!')
			navigate('/')
		} catch (error) {
			toast.error('Erro ao cadastrar usuário!')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen place-items-center font-bold bg-nexus">
				<div
					className="relative hidden min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:block bg-[url('https://ik.imagekit.io/vzr6ryejm/games/fundo_03.jpg?updatedAt=1714988179386')]"
				>
					<div className="absolute inset-0 bg-linear-to-t from-[#05070D] via-[#05070D]/40 to-[#05070D]/10" />
					<div className="absolute inset-0 bg-linear-to-l from-[#05070D]/70 via-transparent to-transparent" />

					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						<div className="animate-scan absolute left-0 h-24 w-full bg-linear-to-b from-transparent via-fuchsia-400/10 to-transparent" />
					</div>

					<div className="absolute inset-8 pointer-events-none">
						<span className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-fuchsia-400/60" />
						<span className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-fuchsia-400/60" />
						<span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-fuchsia-400/60" />
						<span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-fuchsia-400/60" />
					</div>

					<div className="absolute inset-x-10 bottom-16 z-10">
						<span className="inline-block rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-fuchsia-300 backdrop-blur-sm">
							⚡ NOVO POR AQUI?
						</span>
						<h2 className="mt-4 font-display text-4xl font-bold text-white drop-shadow-lg">
							Sua conta na <span className="text-gradient-brand">Loja Games.</span>
						</h2>
						<p className="mt-2 max-w-xs text-sm text-slate-300">
							Cadastre-se para acessar o catálogo completo.
						</p>
					</div>
				</div>

				<form
					onSubmit={cadastrarNovoUsuario}
					className="flex justify-center items-center flex-col w-full max-w-md px-6 sm:px-8 py-10 lg:py-3 gap-3"
				>
					<h2 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl text-center">Cadastrar</h2>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="nome" className="text-slate-200">Nome</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Nome"
							className="border border-white/10 rounded-xl p-3 w-full bg-[#0B0F17] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							required
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="usuario" className="text-slate-200">Usuario</label>
						<input
							type="email"
							id="usuario"
							name="usuario"
							placeholder="Usuario"
							className="border border-white/10 rounded-xl p-3 w-full bg-[#0B0F17] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							required
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="foto" className="flex items-baseline gap-1 text-slate-200">
							<span>Foto (URL)</span>
							<span className="text-slate-500 font-normal text-sm whitespace-nowrap">
								opcional
							</span>
						</label>
						<input
							id="foto"
							name="foto"
							type="text"
							className="border border-white/10 rounded-xl p-3 w-full bg-[#0B0F17] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							placeholder="https://..."
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="dataNascimento" className="text-slate-200">Data de Nascimento</label>
						<input
							type="date"
							id="dataNascimento"
							name="dataNascimento"
							className="border border-white/10 rounded-xl p-3 w-full bg-[#0B0F17] text-white scheme-dark focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							required
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="senha" className="text-slate-200">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border border-white/10 rounded-xl p-3 w-full bg-[#0B0F17] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							required
							onChange={atualizarEstado}
						/>
					</div>

					<div className="flex flex-col w-full gap-2">
						<label htmlFor="confirmarSenha" className="text-slate-200">Confirmar Senha</label>
						<input
							type="password"
							id="confirmarSenha"
							name="confirmarSenha"
							placeholder="Confirmar Senha"
							className="border border-white/10 rounded-xl p-3 w-full bg-[#0B0F17] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							onChange={(e) => setConfirmarSenha(e.target.value)}
						/>
					</div>

					<div className="flex flex-col sm:flex-row justify-around w-full gap-3 sm:gap-8 pt-2">
						<button
							type="button"
							onClick={retornar}
							className="rounded-full text-slate-200 border border-white/10 hover:bg-white/5 w-full sm:w-1/2 py-2.5 transition-colors"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="rounded-full text-white bg-linear-to-r from-cyan-400 to-violet-500 hover:opacity-90 w-full sm:w-1/2 py-2.5 flex justify-center items-center font-display transition-opacity"
						>
							{isLoading ? (
								<div className="h-6 w-6 flex items-center justify-center">
									<RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
								</div>
							) : (
								<span>Cadastrar</span>
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default Cadastro
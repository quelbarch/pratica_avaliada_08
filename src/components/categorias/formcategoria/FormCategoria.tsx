import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { StackIcon } from "@phosphor-icons/react";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Categoria from "../../../models/Categoria";

function FormCategoria() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const [isLoading, setIsLoading] = useState(false)
	const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

	async function buscarPorId(id: string) {
		try {
			await buscar(`/categorias/${id}`, setCategoria, {
				headers: { Authorization: token }
			})
		} catch (error: any) {
			if (error.toString().includes('403')) {
				handleLogout()
			}
		}
	}

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id)
		}
	}, [id])

	function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
		setCategoria({ ...categoria, [e.target.name]: e.target.value })
	}

	async function gerarNovaCategoria(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!categoria.tipo || categoria.tipo.length < 3) {
			toast.warn('O tipo da categoria deve ter no mínimo 3 caracteres!')
			return
		}

		setIsLoading(true)
		const header = { headers: { Authorization: token } }

		try {
			if (id !== undefined) {
				await atualizar('/categorias', categoria, setCategoria, header)
				toast.success('Categoria atualizada com sucesso!')
			} else {
				await cadastrar('/categorias', categoria, setCategoria, header)
				toast.success('Categoria cadastrada com sucesso!')
			}
			navigate('/categorias')
		} catch (error: any) {
			if (error.toString().includes('403')) {
				handleLogout()
			} else {
				toast.error('Erro ao salvar categoria!')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
			<div className="w-full max-w-md">
				<div className="flex items-center gap-4">
					<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-600">
						<StackIcon size={26} weight="bold" className="text-white" />
					</span>
					<div>
						<h1 className="font-display text-2xl font-bold text-white">
							{id !== undefined ? 'Editar Categoria' : 'Nova Categoria'}
						</h1>
						<p className="text-sm text-slate-400">Organize os jogos em novas seções.</p>
					</div>
				</div>

				<form onSubmit={gerarNovaCategoria} className="mt-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0B0F17] p-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="tipo" className="text-sm font-semibold text-slate-200">
							Nome da categoria
						</label>
						<input
							type="text"
							placeholder="Ex.: MOBA, Battle Royale..."
							id='tipo'
							name='tipo'
							className="rounded-xl border border-white/10 bg-[#05070D] p-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
							required
							value={categoria.tipo || ''}
							onChange={atualizarEstado}
						/>
					</div>
					<div className="flex gap-3 pt-2">
						<button
							className="flex items-center justify-center rounded-full bg-linear-to-r from-cyan-400 to-violet-500 px-6 py-2.5 font-display font-semibold text-white transition-opacity hover:opacity-90"
							type="submit"
						>
							{isLoading ? (
								<div className="h-6 w-6 flex items-center justify-center">
									<RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="20" visible={true} />
								</div>
							) : (
								<span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
							)}
						</button>
						<button
							type="button"
							onClick={() => navigate('/categorias')}
							className="rounded-full border border-white/10 px-6 py-2.5 font-semibold text-slate-200 transition-colors hover:bg-white/5"
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormCategoria;
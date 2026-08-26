import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import type Categoria from "../../../models/Categoria";

function DeletarCategoria() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

	async function buscarPorId(id: string) {
		try {
			await buscar(`/categorias/${id}`, setCategoria, {
				headers: { Authorization: token }
			})
		} catch (error: any) {
			if (error.toString().includes('403')) handleLogout()
		}
	}

	useEffect(() => {
		if (id !== undefined) buscarPorId(id)
	}, [id])

	function retornar() {
		navigate('/categorias')
	}

	async function deletarCategoria() {
		try {
			await deletar(`/categorias/${id}`, {
				headers: { Authorization: token }
			})
			toast.success('Categoria apagada com sucesso!')
		} catch (error: any) {
			if (error.toString().includes('403')) {
				handleLogout()
			} else {
				toast.error('Erro ao apagar categoria!')
			}
		}
		retornar()
	}

	return (
		<div className='flex flex-1 flex-col items-center justify-center container w-full max-w-md px-4 mx-auto'>
			<h1 className='py-4 font-display text-3xl text-center text-white md:text-4xl'>Deletar Categoria</h1>
			<p className='mb-4 text-base font-semibold text-center text-slate-300 md:text-lg'>
				Você tem certeza de que deseja apagar a categoria a seguir?</p>
			<div className='w-full flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17]'>
				<header className='px-4 py-3 text-lg font-bold text-white md:px-6 bg-white/5 md:text-2xl'>
					Categoria
				</header>
				<p className='h-full p-4 text-xl text-white md:p-8 md:text-3xl'>{categoria.tipo}</p>
				<div className="flex flex-row border-t border-white/10">
					<button onClick={retornar}
						className='w-full py-3 text-base text-slate-200 hover:bg-white/5 md:text-lg transition-colors'>
						Não
					</button>
					<button onClick={deletarCategoria}
						className='flex items-center justify-center w-full py-3 text-base font-semibold text-white bg-linear-to-r from-fuchsia-500 to-violet-600 hover:opacity-90 md:text-lg transition-opacity'>
						<span>Sim</span>
					</button>
				</div>
			</div>
		</div>
	)
}
export default DeletarCategoria
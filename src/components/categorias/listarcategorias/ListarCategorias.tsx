import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import CardCategorias from "../cardcategorias/CardCategorias";
import type Categoria from "../../../models/Categoria";

function ListarCategorias() {
	const [categorias, setCategorias] = useState<Categoria[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const { usuario, handleLogout } = useContext(AuthContext)
	const token = usuario.token

	async function buscarCategorias() {
		try {
			await buscar('/categorias', setCategorias, {
				headers: { Authorization: token }
			})
		} catch (error: any) {
			if (error.toString().includes('403')) {
				toast.error('Sessão expirada. Faça login novamente.')
				handleLogout()
			} else {
				toast.error('Erro ao buscar categorias!')
			}
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		buscarCategorias()
	}, [])

	return (
		<>
			{isLoading && (
				<div className="flex justify-center py-8">
					<ThreeDots visible={true} color="#0f766e" />
				</div>
			)}
			<div className="flex justify-center w-full overflow-x-hidden">
				<div className="box-border w-full px-4 py-4 mt-8 mb-4 max-w-8xl sm:px-6 md:px-8 lg:px-12 md:py-6">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 mb-4 md:mb-0">
						{categorias.map((categoria) => (
							<CardCategorias key={categoria.id} categoria={categoria} />
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default ListarCategorias
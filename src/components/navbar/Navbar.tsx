import { ListIcon, ShoppingCartIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import SearchForm from "./SearchForm"

function Navbar() {
	const { handleLogout } = useContext(AuthContext)
	const [menuAberto, setMenuAberto] = useState(false)

	const linkClasses = "relative text-slate-300 hover:text-white transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-cyan-400 after:to-fuchsia-500 after:transition-all"

	return (
		<>
			<div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05070D]/80 backdrop-blur-md">
				<div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
					<Link to="/home" className="flex items-center gap-2">
						<img
							src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png"
							alt="Logo"
							className="w-40 md:w-48"
						/>
					</Link>

					<div className="hidden w-2/5 items-center justify-center text-black md:flex">
						<SearchForm />
					</div>

					<div className="hidden items-center gap-6 md:flex">
						<Link to="/produtos" className={linkClasses}>Produtos</Link>
						<Link to="/categorias" className={linkClasses}>Categorias</Link>
						<Link to="/cadastrarcategoria" className={linkClasses}>Nova Categoria</Link>
						<Link to="/perfil" aria-label="Minha conta" className="text-slate-300 hover:text-white transition-colors">
							<UserIcon size={24} weight="bold" />
						</Link>
						<Link to="/carrinho" aria-label="Carrinho de compras" className="relative flex items-center text-slate-300 hover:text-white transition-colors">
							<ShoppingCartIcon size={24} weight="bold" />
							<span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-500 text-[10px] font-bold text-white">
								0
							</span>
						</Link>
						<button
							aria-label="Sair"
							onClick={handleLogout}
							className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:border-fuchsia-500/50 hover:text-white transition-colors cursor-pointer"
						>
							<SignOutIcon size={18} weight="bold" />
							Sair
						</button>
					</div>

					<button
						className="p-2 text-white md:hidden"
						aria-label="Abrir menu"
						onClick={() => setMenuAberto(!menuAberto)}
					>
						<ListIcon size={26} />
					</button>
				</div>
			</div>

			{menuAberto && (
				<div className="flex flex-col gap-3 border-b border-white/10 bg-[#05070D] px-6 py-4 text-slate-200 md:hidden">
					<div className="text-black"><SearchForm /></div>
					<Link to="/produtos" onClick={() => setMenuAberto(false)}>Produtos</Link>
					<Link to="/categorias" onClick={() => setMenuAberto(false)}>Categorias</Link>
					<Link to="/cadastrarcategoria" onClick={() => setMenuAberto(false)}>Nova Categoria</Link>
					<Link to="/perfil" onClick={() => setMenuAberto(false)} className="flex items-center gap-2">
						<UserIcon size={20} weight="bold" /> Minha conta
					</Link>
					<Link to="/carrinho" onClick={() => setMenuAberto(false)} className="flex items-center gap-2">
						<ShoppingCartIcon size={20} weight="bold" /> Carrinho
					</Link>
					<button onClick={handleLogout} className="flex items-center gap-2 text-left cursor-pointer">
						<SignOutIcon size={20} weight="bold" /> Sair
					</button>
				</div>
			)}
		</>
	)
}

export default Navbar
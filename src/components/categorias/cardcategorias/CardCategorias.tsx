import { Link } from "react-router-dom";
import { StackIcon } from "@phosphor-icons/react";
import type Categoria from "../../../models/Categoria";

interface CardCategoriasProps {
    categoria: Categoria
}

function CardCategorias({ categoria }: CardCategoriasProps) {
    return (
        <div className='flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F17]'>
            <div className="p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-violet-500 to-fuchsia-500">
                    <StackIcon size={22} weight="bold" className="text-white" />
                </span>
                <p className='mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400'>Categoria</p>
                <p className='mt-1 text-2xl font-display font-semibold text-white'>{categoria.tipo}</p>
            </div>
            <div className="flex border-t border-white/10">
                <Link to={`/editarcategoria/${categoria.id}`}
                    className='w-full flex items-center justify-center py-3 text-sm text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-colors'>
                    Editar
                </Link>
                <Link to={`/deletarcategoria/${categoria.id}`}
                    className='w-full flex items-center justify-center py-3 text-sm text-slate-300 hover:text-fuchsia-400 hover:bg-white/5 border-l border-white/10 transition-colors'>
                    Deletar
                </Link>
            </div>
        </div>
    );
}

export default CardCategorias;
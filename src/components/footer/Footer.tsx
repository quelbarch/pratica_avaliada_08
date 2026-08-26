import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'

function Footer() {
	return (
		<div className="mt-auto w-full border-t border-white/10 bg-[#05070D] px-4 py-8 text-white">
			<div className="container mx-auto flex flex-col items-center gap-3 text-center">
				<span className="font-display text-lg font-semibold tracking-tight">
					LOJA<span className="text-cyan-400">//</span>GAMES
				</span>
				<p className="text-sm text-slate-400">Loja de Games Generation · Copyright 2026</p>
				<div className="flex gap-3">
					<a href="#" target="_blank" rel="noopener noreferrer"
						className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors">
						<LinkedinLogoIcon size={18} weight="bold" />
					</a>
					<a href="#" target="_blank" rel="noopener noreferrer"
						className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors">
						<InstagramLogoIcon size={18} weight="bold" />
					</a>
					<a href="#" target="_blank" rel="noopener noreferrer"
						className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors">
						<FacebookLogoIcon size={18} weight="bold" />
					</a>
				</div>
			</div>
		</div>
	)
}

export default Footer
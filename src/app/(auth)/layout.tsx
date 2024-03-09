import React from 'react'
import Image from 'next/image'

type AuthLayoutProps = {
	children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="flex min-h-full flex-col">
			<div className="grid flex-1 grid-cols-1 items-center justify-items-center md:grid-cols-2 md:items-stretch md:justify-items-stretch">
				<div className="static col-span-full row-span-full md:relative md:col-span-1">
					<Image
						src="/images/login_bg.jpg"
						alt="A boiling hot water in a pot"
						priority
						quality={100}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						fill
						className="aspect-[16/9] object-cover"
					/>
				</div>
				<main className="container z-40 col-span-full row-span-full md:col-span-1">{children}</main>
			</div>
		</div>
	)
}

export default AuthLayout

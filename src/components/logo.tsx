import React from 'react'

import { cn } from '@/lib/utils'

type LogoProps = {
	source?: string
	link?: string
}

function Logo({
	source = '/images/cerindo_bintang_logo.svg',
	link = '/',
	className,
	...props
}: LogoProps & React.HTMLAttributes<HTMLAnchorElement>) {
	return (
		<a href={link} className={cn(className)} {...props}>
			<img src={source} className="inline-block h-10 w-auto text-[#9d001b]" alt="Logo" />
			<span className="sr-only">Home</span>
		</a>
	)
}

export default Logo

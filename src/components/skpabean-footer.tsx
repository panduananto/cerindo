'use client'

import React from 'react'

import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

const SkpabeanFooter = () => {
	return (
		<div className="mt-auto flex flex-row items-center justify-between border-t bg-background px-4 py-3 sm:px-6 lg:px-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="mr-auto">
						Generate
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuGroup>
						<DropdownMenuItem>SKP &#40;docx&#41;</DropdownMenuItem>
						<DropdownMenuItem>SKDO &#40;docx&#41;</DropdownMenuItem>
						<DropdownMenuItem>DNP &#40;docx&#41;</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem className="hover:text-primary">Reset form</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default SkpabeanFooter

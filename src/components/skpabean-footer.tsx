'use client'

import React from 'react'

import ExportSKDOButton from './export-skdo-button'
import ExportSKPButton from './export-skp-button'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

const SKPabeanFooter = () => {
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
						<ExportSKPButton />
						<ExportSKDOButton />
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

export default SKPabeanFooter

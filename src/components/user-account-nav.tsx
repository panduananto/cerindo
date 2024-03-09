'use client'

import React from 'react'
import Link from 'next/link'

import { User } from '@supabase/supabase-js'

import SignoutButton from './auth/signout-button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Icons from './ui/icons'

type UserAccountNavProps = {
	user: User | null
}

const UserAccountNav = ({ user }: UserAccountNavProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="relative size-8 rounded-full">
					<Avatar>
						{user?.user_metadata.avatar_url ? (
							<AvatarImage src={user.user_metadata.avatar_url} alt={`${user.email} profile picture`} />
						) : (
							<AvatarFallback>
								<Icons.user className="size-5" />
								<span className="sr-only">{user?.email}</span>
							</AvatarFallback>
						)}
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p>Signed in as</p>
						<p className="mt-1.5 text-sm font-medium leading-none">{user?.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href="/dashboard">
							<Icons.dashboard className="mr-2 size-4" aria-hidden="true" />
							Dashboard
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<SignoutButton className="w-full" />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAccountNav

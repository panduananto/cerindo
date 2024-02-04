import React from 'react'

import { Button } from './ui/button'
import Icons from './ui/icons'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading: boolean
}

const LoadingButton = ({ children, loading, ...props }: LoadingButtonProps) => {
	return (
		<Button {...props} disabled={props.disabled || loading}>
			{loading && <Icons.loader className="mr-2 size-4 animate-spin" />}
			{children}
		</Button>
	)
}

export default LoadingButton

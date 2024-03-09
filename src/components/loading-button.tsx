import React from 'react'

import { Button } from './ui/button'
import Icons from './ui/icons'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading: boolean
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
	({ children, loading, ...props }, ref) => {
		return (
			<Button ref={ref} {...props} disabled={props.disabled || loading}>
				{loading && <Icons.loader className="mr-2 size-4 animate-spin" />}
				{children}
			</Button>
		)
	},
)
export default LoadingButton

import { useEffect, useState } from 'react'

import { useDebouncedCallback } from 'use-debounce'

const useDebouncedWindowSize = (delay) => {
	const [data, setData] = useState({
		width: 0,
		height: 0,
	})

	const handleResize = useDebouncedCallback(() => {
		setData({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}, delay)

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [handleResize])

	return data
}

export default useDebouncedWindowSize

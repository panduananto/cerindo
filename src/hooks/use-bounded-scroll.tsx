// https://buildui.com/recipes/fixed-header
'use client'

import React, { useEffect } from 'react'

import { useMotionValue, useScroll, useTransform } from 'framer-motion'

import { clamp } from '@/lib/utils'

const useBoundedScroll = (threshold: number) => {
	let { scrollY } = useScroll()
	let scrollYBounded = useMotionValue(0)
	let scrollYBoundedProgress = useTransform(scrollYBounded, [0, threshold], [0, 1])

	useEffect(() => {
		return scrollY.on('change', (current) => {
			let previous = scrollY.getPrevious() ?? current
			let diff = current - previous
			let newScrollYBounded = scrollYBounded.get() + diff

			scrollYBounded.set(clamp(newScrollYBounded, 0, threshold))
		})
	}, [threshold, scrollY, scrollYBounded])

	return { scrollYBounded, scrollYBoundedProgress }
}

export default useBoundedScroll

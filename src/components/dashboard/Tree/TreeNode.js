import React, { useEffect, useRef, useState } from 'react'

import { HiChevronRight } from 'react-icons/hi'
import { IconContext } from 'react-icons/lib'
import { NavLink } from 'react-router-dom'

import classNames from '../../../utils/classNames'

function TreeNode(props) {
	const [isOpen, setIsOpen] = useState(false)

	const nodeParentRef = useRef()

	const { node, getChildNodes, level = 0 } = props

	useEffect(() => {
		if (node.children) {
			if (nodeParentRef.current && isOpen) {
				nodeParentRef.current.style.height = `${nodeParentRef.current.scrollHeight}px`
			} else {
				nodeParentRef.current.style.height = '0px'
			}
		}
	}, [isOpen, node])

	return (
		<React.Fragment>
			{node.type === 'folder' ? (
				<li role="button" level={level} type={node.type} onClick={() => setIsOpen(!isOpen)}>
					<div
						className={classNames(
							isOpen ? 'text-red-600' : 'text-slate-700',
							'mx-2 flex items-center justify-between rounded px-4 py-2 text-[13px] font-medium hover:bg-red-50 hover:text-red-600',
						)}
					>
						<div className="inline-flex items-center">
							<span className="mr-3 shrink-0">{node.icon}</span>
							{node.text}
						</div>
						<IconContext.Provider value={{ className: 'h-4 w-4 text-slate-700' }}>
							{node.type === 'folder' && node.children && (
								<span>
									<HiChevronRight
										className={classNames(
											isOpen ? 'rotate-90' : 'rotate-0',
											'transform transition-transform duration-200 ease-in-out',
										)}
									/>
								</span>
							)}
						</IconContext.Provider>
					</div>
				</li>
			) : (
				<li level={level} type={node.type}>
					<NavLink
						to={node.link}
						end
						className={(props) =>
							classNames(
								props.isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 ',
								'mx-2 flex items-center rounded px-4 py-2 text-[13px] text-base font-medium hover:bg-red-50 hover:text-red-600',
							)
						}
					>
						{node.icon && <span className="mr-3 shrink-0">{node.icon}</span>}
						<span className={level > 0 ? 'pl-9' : 'pl-0'}>{node.text}</span>
					</NavLink>
				</li>
			)}
			{node.children ? (
				<ul ref={nodeParentRef} className="space-y-1 overflow-hidden transition-[height] duration-200 ease-in-out">
					{getChildNodes(node).map((childNode) => {
						return <TreeNode key={`node-${childNode.link}`} {...props} node={childNode} level={level + 1}></TreeNode>
					})}
				</ul>
			) : (
				isOpen &&
				getChildNodes(node).map((childNode) => {
					return <TreeNode key={`node-${childNode.link}`} {...props} node={childNode} level={level + 1}></TreeNode>
				})
			)}
		</React.Fragment>
	)
}

export default TreeNode

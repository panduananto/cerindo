import React from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import { HiChevronRight, HiChevronDown } from 'react-icons/hi';

import classNames from '../../../utils/classNames';
import { IconContext } from 'react-icons/lib';

function TreeNode(props) {
	const { node, getChildNodes, level = 0, onToggle } = props;
	const location = useLocation();

	return (
		<React.Fragment>
			{node.type === 'folder' ? (
				<li role="button" level={level} type={node.type} onClick={() => onToggle(node)}>
					<div
						className={classNames(
							location.pathname === node.link
								? 'bg-red-50 text-red-600'
								: 'text-slate-700 hover:bg-red-50 hover:text-red-600',
							'mx-2 flex items-center justify-between rounded px-4 py-2 text-[13px] font-semibold'
						)}
					>
						<div className="inline-flex items-center">
							<span className="mr-3">{node.icon}</span>
							{node.text}
						</div>
						<IconContext.Provider value={{ className: 'h-4 w-4' }}>
							{node.type === 'folder' && node.children && (
								<span>{node.isOpen ? <HiChevronDown /> : <HiChevronRight />}</span>
							)}
						</IconContext.Provider>
					</div>
				</li>
			) : (
				<li level={level} type={node.type}>
					<NavLink
						to={node.link}
						className={(props) =>
							classNames(
								props.isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-red-50 hover:text-red-600',
								'mx-2 flex items-center rounded px-4 py-2 text-[13px] text-base font-semibold'
							)
						}
					>
						{node.icon && <span className="mr-3">{node.icon}</span>}
						<span className={level > 0 && 'pl-9'}>{node.text}</span>
					</NavLink>
				</li>
			)}
			{node.isOpen &&
				getChildNodes(node).map((childNode) => {
					return <TreeNode {...props} node={childNode} level={level + 1}></TreeNode>;
				})}
		</React.Fragment>
	);
}

export default TreeNode;

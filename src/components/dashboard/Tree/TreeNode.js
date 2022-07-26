import React from 'react';

import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi';

function TreeNode(props) {
	const { node, getChildNodes, level, onToggle } = props;

	return (
		<React.Fragment>
			<div level={level} type={node.type}>
				<div>
					{node.type === 'folder' &&
						(node.isOpen ? <HiOutlineChevronDown></HiOutlineChevronDown> : <HiOutlineChevronUp></HiOutlineChevronUp>)}
				</div>
				<span role="button" onClick={() => onToggle(node)}>
					{node.text}
				</span>
			</div>
			{node.isOpen &&
				getChildNodes(node).map((childNode) => <TreeNode {...props} node={childNode} level={level + 1}></TreeNode>)}
		</React.Fragment>
	);
}

export default TreeNode;

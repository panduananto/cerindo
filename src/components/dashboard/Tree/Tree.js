import React, { useState } from 'react';

import TreeNode from './TreeNode';

function Tree({ items }) {
	const [nodes] = useState(items);

	const getRootNodes = () => nodes.filter((node) => node.isRoot);
	const getChildNodes = (node) => (!node.children ? [] : node.children.map((nc) => nc));

	const rootNodes = getRootNodes();

	return (
		<ul className="space-y-1">
			{rootNodes.map((node) => (
				<TreeNode key={`node-${node.text}`} node={node} getChildNodes={getChildNodes} />
			))}
		</ul>
	);
}

export default Tree;

import React, { useState } from 'react';

import {
	HiOutlineHome,
	HiOutlineCheckCircle,
	HiOutlineCurrencyDollar,
	HiOutlineDocumentReport,
	HiOutlineClipboardList,
	HiOutlineDatabase,
} from 'react-icons/hi';

import TreeNode from './TreeNode';

const sideBarNavigationItems = [
	{
		text: 'Dashboard',
		link: '',
		isRoot: false,
		type: 'file',
		icon: <HiOutlineHome></HiOutlineHome>,
	},
	{
		text: 'Checklist Shipment',
		link: 'checklist-shipment',
		isRoot: false,
		type: 'file',
		icon: <HiOutlineCheckCircle></HiOutlineCheckCircle>,
	},
	{
		text: 'Cash Bank Requisition',
		link: 'cbr',
		isRoot: false,
		type: 'file',
		icon: <HiOutlineCurrencyDollar></HiOutlineCurrencyDollar>,
	},
	{
		text: 'Shipment Report',
		link: 'shipment-report',
		isRoot: false,
		type: 'file',
		icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
	},
	{
		text: 'Pertanggungjawaban',
		link: 'ptj',
		isRoot: false,
		type: 'file',
		icon: <HiOutlineClipboardList></HiOutlineClipboardList>,
	},
	{
		text: 'Master Data',
		link: 'master-data',
		isRoot: true,
		type: 'folder',
		icon: <HiOutlineDatabase></HiOutlineDatabase>,
		children: [
			{
				text: 'Shipper',
				link: 'shipper',
			},
			{
				text: 'Consignee',
				link: 'consignee',
			},
			{
				text: 'Agent',
				link: 'agent',
			},
		],
	},
];

function Tree() {
	const [nodes, setNodes] = useState(sideBarNavigationItems);

	const getRootNodes = () => nodes.filter((node) => node.isRoot);
	const getChildNodes = (node) => (!node.children ? [] : node.children.map((nc) => nc));
	const onToggle = (node) => {
		const nodesCopy = [...nodes];
		const target = nodesCopy.findIndex((nodeCopy) => nodeCopy.link === node.link);

		nodesCopy[target].isOpen = !node.isOpen;
		setNodes(nodesCopy);
	};

	const rootNodes = getRootNodes();

	return (
		<div>
			{rootNodes.map((node) => (
				<TreeNode node={node} getChildNodes={getChildNodes} onToggle={onToggle}></TreeNode>
			))}
		</div>
	);
}

export default Tree;

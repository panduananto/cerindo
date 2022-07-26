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
		isRoot: true,
		type: 'file',
		icon: <HiOutlineHome></HiOutlineHome>,
	},
	{
		text: 'Checklist Shipment',
		link: 'checklist-shipment',
		isRoot: true,
		type: 'file',
		icon: <HiOutlineCheckCircle></HiOutlineCheckCircle>,
	},
	{
		text: 'Cash Bank Requisition',
		link: 'cbr',
		isRoot: true,
		type: 'file',
		icon: <HiOutlineCurrencyDollar></HiOutlineCurrencyDollar>,
	},
	{
		text: 'Shipment Report',
		link: 'shipment-report',
		isRoot: true,
		type: 'file',
		icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
	},
	{
		text: 'Pertanggungjawaban',
		link: 'ptj',
		isRoot: true,
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
				link: 'master-data/shipper',
				isRoot: false,
				type: 'file',
			},
			{
				text: 'Consignee',
				link: 'master-data/consignee',
				isRoot: false,
				type: 'file',
			},
			{
				text: 'Agent',
				link: 'master-data/agent',
				isRoot: false,
				type: 'file',
			},
		],
	},
];

function Tree() {
	const [nodes, setNodes] = useState(sideBarNavigationItems);

	const getRootNodes = () => nodes.filter((node) => node.isRoot);
	const getChildNodes = (node) => (!node.children ? [] : node.children.map((nc) => nc));

	const onToggle = (node) => {
		const targetIndex = nodes.findIndex((n) => n.link === node.link);
		const nodesCopy = [...nodes];

		nodesCopy[targetIndex].isOpen = !node.isOpen;
		setNodes(nodesCopy);
	};

	const rootNodes = getRootNodes();

	return (
		<ul className="space-y-1">
			{rootNodes.map((node) => (
				<TreeNode node={node} getChildNodes={getChildNodes} onToggle={onToggle} />
			))}
		</ul>
	);
}

export default Tree;

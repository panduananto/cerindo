import {
	HiOutlineHome,
	HiOutlineDocumentText,
	HiOutlineCash,
	HiOutlineDocumentReport,
	HiOutlineClipboardList,
	HiOutlineDatabase,
	HiOutlineDocumentSearch,
} from 'react-icons/hi';

const navigationItems = [
	{ text: 'home', link: '#home' },
	{ text: 'client', link: '#client' },
	{ text: 'service', link: '#service' },
	{ text: 'project', link: '#project' },
	{ text: 'get in touch', link: '#get-in-touch' },
];

const clients = [
	{ id: 'abn', logo: '/images/ABN_logo.svg' },
	{ id: 'argopantes', logo: '/images/argopantes_logo.svg' },
	{ id: 'asiakomnet', logo: '/images/asiakomnet_logo.svg' },
	{ id: 'bbg', logo: '/images/BBG_logo.svg' },
	{ id: 'bbi', logo: '/images/BBI_logo.svg' },
	{ id: 'bbraun', logo: '/images/bbraun_logo.svg' },
	{ id: 'covestro', logo: '/images/covestro_logo.svg' },
	{ id: 'ecosway', logo: '/images/ecosway_logo.svg' },
	{ id: 'fiberhome', logo: '/images/fiberhome_logo.svg' },
	{ id: 'gjm', logo: '/images/gjm_logo.svg' },
	{ id: 'gramedia', logo: '/images/gramedia_logo.svg' },
	{ id: 'inti', logo: '/images/inti_logo.svg' },
	{ id: 'kai', logo: '/images/kai_logo.svg' },
	{ id: 'kemhan', logo: '/images/kemhan_logo.svg' },
	{ id: 'lp3i', logo: '/images/lp3i_logo.svg' },
	{ id: 'metrodata', logo: '/images/metrodata_logo.svg' },
	{ id: 'mmnatures', logo: '/images/mmnatures_logo.svg' },
	{ id: 'multistrada', logo: '/images/multistrada_logo.svg' },
	{ id: 'nokia', logo: '/images/nokia_logo.svg' },
	{ id: 'pindad', logo: '/images/pindad_logo.svg' },
	{ id: 'ptpal', logo: '/images/ptpal_logo.svg' },
	{ id: 'rheinmetall', logo: '/images/rheinmetall_logo.svg' },
	{ id: 'selindoalpha', logo: '/images/selindoalpha_logo.svg' },
	{ id: 'SIAEMIC', logo: '/images/SIAEMIC_logo.svg' },
	{ id: 'telkomsel', logo: '/images/telkomsel_logo.svg' },
	{ id: 'triasmitra', logo: '/images/triasmitra_logo.svg' },
];

// prettier-ignore
const services = {
	'Customs Brockerage': [
		{
			id: 1,
			title: 'Customs Brockerage',
			description: 'Well-versed staffs in customs procedure and documentation, thereby avoiding unnecessary delays and costly error. Using our own PIB/PEB EDI (Electronic Data Interchange) to declare your Import/Export promptly without delay.',
			images: '/images/customs_brockerage.jpg',
			benefits: [
				{ description: 'A coordinated team to ensure compliance and efficiency.' },
				{ description: 'Expert assistance and advice.' },
				{ description: 'Awereness of regulations and requirements.' },
			],
		},
	],
	'FCL and LCL Consolidation': [
		{
			id: 2,
			title: 'FCL and LCL Consolidation',
			description: 'We arrange your cargo in 20’, 40’, High Cube, Open Top/Open Side, Standard / Dry Container, Flat rack, and Reefer.',
			images: '/images/fcl_lcl_consolidation.jpg',
			benefits: [
				{ description: 'Competitive prices.' },
				{ description: 'Shipping expertise.' },
				{ description: 'Seamless transparency.' },
			],
		},
	],
	'Project Cargo Specialist': [
		{
			id: 3,
			title: 'Project Cargo Specialist',
			description: 'We offer our Project Cargo Transportation service from the plantation to site, includes multimodal transportation, customs handling, coordinating, and consulting service.',
			images: '/images/project_cargo_specialist.jpg',
			benefits: [
				{ description: 'Special equipment for loading/unloading process.' },
				{ description: 'Efficient process.' },
				{ description: 'Reliable service.' },
			],
		},
	],
	'Air-Sea Freight Export-Import': [
		{
			id: 4,
			title: 'Air-Sea Freight Export-Import',
			description: 'Combining transportation Sea-Air, Air-Sea, Sea-Sea, and Air-Air Transfer. We operate fast and frequent consolidated services that lead to an appropriate cost with a guaranteed satisfaction.',
			images: '/images/freight_exim.jpg',
			benefits: [
				{ description: 'Cost efficiency on freight loads.' },
				{ description: 'Lowest percentage of cargo losses.' },
				{ description: 'Travel without limitations.' },
			],
		},
	],
	'Warehousing and General Cargo': [
		{
			id: 5,
			title: 'Warehousing and General Cargo',
			description: 'We own and manage 700 sq.mtr warehouse in Komplek Pergudangan Arcadia, Daan Mogot Km 21.5, Batu Ceper, Tangerang. Local expertise and international knowledge supported by worldwide agency will apply a professional handling at every destination.',
			images: '/images/warehousing.jpg',
			benefits: [
				{ description: 'Located on strategic area.' },
				{ description: 'Environmentally-friendly product storage.' },
				{ description: 'Flexible storage arrangements for your goods.' },
			],
		},
	],
	'Dangerous Goods Handling': [
		{
			id: 6,
			title: 'Dangerous Goods Handling',
			description: 'Dangerous Cargo (also referred to as Hazardous) is the cargo classified as explosive, flammable, and toxic. The cargo is dangerous by nature and hence required a lot of precaution, safety measure, care handling. Limited forwarding company will be able to handle such cargo considering serious damage either to cargo itself, people, and surroundings. Just contact us when you need someone to handle such classification of cargo.',
			images: '/images/dangerous_goods.jpg',
			benefits: [
				{ description: 'Enhanced safety, efficiency and performance.' },
				{ description: 'Ensures safety, environmental protection.' },
				{ description: 'Experienced dangerous goods specialists.' },
			],
		},
	],
};

// prettier-ignore
const projects = [
	{
		id: 1,
		title: 'Telkomsel',
		totalShipment: '12748',
		description: 'Official house forwarder for Telkomsel. Importing telecom equipment for district capital allover Indonesia with Priority Lane facility. Bonded warehouse management in 2004-2006. Providing export services including: warehouse management, export documentation, shipment arrangement, container stuffing, trucking, haulage, and ocean freight.',
		backgroundImage: '/images/telkomsel_bg.jpg',
		images: [
			{
				src: '/images/telkomsel_bts.jpg',
			},
			{
				src: '/images/telkomsel_bts_drum.jpg',
			},
			{
				src: '/images/telkomsel_simcard.jpg',
			},
		],
	},
	{
		id: 2,
		title: 'Kementerian Kelautan dan Perikanan RI',
		totalShipment: '78',
		description: 'Delivery and local distribution of material for fish farming project located on Sabang, Pangandaran and Karimun, Java. Import of mooring, cages, netts from Norway by 43 containers, bracket for sinker tube from China by 4 containers, 3 unit feeding barges from Vietnam via 2 work boats from Batam.',
		backgroundImage: '/images/kkp_bg.jpg',
		images: [
			{
				src: '/images/kkp_mooring.jpg',
			},
			{
				src: '/images/kkp_feeding_barges.jpg',
			},
			{
				src: '/images/kkp_bracket_sinker_tubes.jpg',
			},
		],
	},
	{
		id: 3,
		title: 'PT PAL Indonesia',
		totalShipment: '567',
		description: 'Shipset material for 5 (five) units PALWO BOWONO vessel, PALPASS 500 project, Fast Patrol Boats for Indonesian Customs, and FPU for PT. PERTAMINA, 2 (two) units MPC project. Main Diesel Engine 8PA5L, Auxiliary Main Diesel Engine PB1600 from Korea to Surabaya.',
		backgroundImage: '/images/ptpal_bg.jpg',
		images: [
			{
				src: '/images/pal_main_diesel_engine_8pa5l.jpg',
			},
			{
				src: '/images/pal_main_diesel_engine_pb1600.jpg',
			},
			{
				src: '/images/pal_fast_patrol_boat.jpg',
			},
		],
	},
];

const sideBarNavigationItems = [
	{
		text: 'Dashboard',
		link: '',
		isRoot: true,
		type: 'file',
		icon: <HiOutlineHome></HiOutlineHome>,
	},
	{
		text: 'Master Data',
		link: 'data',
		isRoot: true,
		type: 'folder',
		icon: <HiOutlineDatabase></HiOutlineDatabase>,
		children: [
			// {
			// 	text: 'Shipper',
			// 	link: 'data/shipper',
			// 	isRoot: false,
			// 	type: 'file',
			// },
			// {
			// 	text: 'Consignee',
			// 	link: 'data/consignee',
			// 	isRoot: false,
			// 	type: 'file',
			// },
			// {
			// 	text: 'Agent',
			// 	link: 'data/agent',
			// 	isRoot: false,
			// 	type: 'file',
			// },
			{
				text: 'AKL',
				link: 'data/akl',
				isRoot: false,
				type: 'file',
			},
		],
	},
	// {
	// 	text: 'Checklist Shipment',
	// 	link: 'checklist-shipment',
	// 	isRoot: true,
	// 	type: 'file',
	// 	icon: <HiOutlineDocumentText></HiOutlineDocumentText>,
	// },
	// {
	// 	text: 'Cash Bank Requisition',
	// 	link: 'cbr',
	// 	isRoot: true,
	// 	type: 'file',
	// 	icon: <HiOutlineCash></HiOutlineCash>,
	// },
	// {
	// 	text: 'Shipment Report',
	// 	link: 'shipment-report',
	// 	isRoot: true,
	// 	type: 'file',
	// 	icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
	// },
	// {
	// 	text: 'Pertanggungjawaban',
	// 	link: 'ptj',
	// 	isRoot: true,
	// 	type: 'file',
	// 	icon: <HiOutlineClipboardList></HiOutlineClipboardList>,
	// },
	{
		text: 'Pencarian AKL',
		link: 'akl',
		isRoot: true,
		type: 'file',
		icon: <HiOutlineDocumentSearch></HiOutlineDocumentSearch>,
	},
	{
		text: 'SK Pabean',
		link: 'sk-pabean',
		isRoot: true,
		type: 'file',
		icon: <HiOutlineDocumentText></HiOutlineDocumentText>,
	},
];

export { clients, navigationItems, services, projects, sideBarNavigationItems };

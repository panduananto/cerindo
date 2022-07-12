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

export { clients, navigationItems, services };

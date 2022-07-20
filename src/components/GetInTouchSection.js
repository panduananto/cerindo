import React from 'react';

import { IconContext } from 'react-icons/lib';
import { FaBuilding, FaRegBuilding, FaWarehouse } from 'react-icons/fa';

function GetInTouchSection() {
	return (
		<div className="prose prose-sm w-full max-w-none sm:prose-base">
			<div className="grid grid-cols-6 gap-6">
				<IconContext.Provider value={{ className: 'h-7 w-7 text-slate-900' }}>
					<div className="col-span-6 rounded bg-zinc-100 p-4 lg:col-span-2">
						<FaBuilding></FaBuilding>
						<h3>Head Office</h3>
						<p>Puri Sentra Niaga Blok B No.37, Jatiwaringin, Jakarta Timur 13620</p>
						<div className="flex">
							<span>Phone:</span>
							<a href="tel:+62218629000" className="ml-2 block">
								+6221-862-9000
							</a>
						</div>
						<div className="flex">
							<span>Fax:</span>
							<a href="tel:+62218603677" className="ml-2 block">
								+6221-860-3677
							</a>
						</div>
					</div>
					<div className="col-span-6 rounded bg-zinc-100 p-4 lg:col-span-2">
						<FaRegBuilding></FaRegBuilding>
						<h3>Surabaya Branch Office</h3>
						<p>Jl. Ikan Mungsing IX No.2, Surabaya 60177</p>
						<div className="flex">
							<span>Phone:</span>
							<a href="tel:+62313571082" className="ml-2 block">
								+6231-357-1082
							</a>
						</div>
						<div className="flex">
							<span>Fax:</span>
							<a href="tel:+62313521829" className="ml-2 block">
								+6231-352-1829
							</a>
						</div>
					</div>
					<div className="col-span-6 rounded bg-zinc-100 p-4 lg:col-span-2">
						<FaWarehouse></FaWarehouse>
						<h3>Komplek Pergudangan Arcadia</h3>
						<p>Blok G 15 No.17-18, Jl. Daan Mogot KM 21,5, Batuceper-Tangerang</p>
						<div className="flex">
							<span>Phone:</span>
							<a href="tel:+622129006246/47" className="ml-2 block">
								+6221-2900-6246/47
							</a>
						</div>
						<div className="flex">
							<span>Fax:</span>
							<a href="tel:+622129006248" className="ml-2 block">
								+6221-2900-6248
							</a>
						</div>
					</div>
				</IconContext.Provider>
			</div>
		</div>
	);
}

export default GetInTouchSection;

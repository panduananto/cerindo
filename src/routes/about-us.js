import React from 'react';

import { IconContext } from 'react-icons/lib';
import { HiEye, HiPresentationChartLine, HiAcademicCap } from 'react-icons/hi';

function AboutUs() {
	return (
		<div className="w-full bg-white">
			<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
				<div className="w-full">
					<article className="prose prose-slate max-w-none font-inter prose-headings:font-rubik">
						<h1>About Cerindo</h1>
						<img src="/images/about_us_bg.jpg" className="rounded" alt="" />
						<p className="lead">
							We are known as CERINDO. It is our corporate brand name under a group management of PT. Sinhadji Rakidjo
							Sindapati (SRS) as our holding company. The group focuses in logistics field, that covers customs
							brokerage, FCL/LCL consolidation, air/sea/multimoda transportation, domestic land/air/sea transportation,
							and warehousing. CERINDO has consolidated facilities and operation in order to be more efficient and
							competitive.
						</p>
						<IconContext.Provider value={{ className: 'h-8 w-8 text-slate-900' }}>
							<div className="grid grid-cols-6 gap-6">
								<div className="col-span-2 rounded bg-blue-100 p-4">
									<HiEye></HiEye>
									<h3>Our Vission</h3>
									<p>
										Becoming a professional Logistics Company that quickly grab every opportunity, providing a
										satisfying services for customers, in order to create a continuing business growth.
									</p>
								</div>
								<div className="col-span-2 rounded bg-zinc-100 p-4">
									<HiPresentationChartLine></HiPresentationChartLine>
									<h3>Our Mission</h3>
									<p>
										Providing logistics services including freight forwarding, customs clearance, consultation,
										warehousing, cargo and courier both domestic and international, based on customers’ satisfaction.
									</p>
								</div>
								<div className="col-span-2 rounded bg-red-100 p-4">
									<HiAcademicCap></HiAcademicCap>
									<h3>Our Culture</h3>
									<p>Upholding business ethic and a healthy competition.</p>
								</div>
							</div>
						</IconContext.Provider>
						<h2>CERINDO companies are officially registered as:</h2>
						<ol>
							<li>
								<p>
									<strong>PT. CERINDO TRANSPORT LOGISTIK (CTL)</strong>
								</p>
								<p>
									PT. CERINDO TRANSPORT LOGISTIK (CTL), were established in 2000, rendering customized services to suit
									the customer’s requirement since 2000. It is the official freight forwarder of PT. TELKOMSEL, the
									biggest mobile telecommunication company in Indonesia. CTL has been involved in solving import
									problems and has turned a lot of penalty threats into cost efficiency. Telkomsel ever since enjoying
									the highest rewards from customs authority, i.e. The Priority Lane Importer, one of our successful
									achievement dedicated to our valued customer.
								</p>
							</li>
							<li>
								<p>
									<strong>PT. CERINDO PRIMA LOGISTIK (CPL)</strong>
								</p>
								<p>
									PT. CERINDO PRIMA LOGISTIK (CPL), were established in 2005, and has accomplished many shipment
									projects assigned by private companies, government institutions, and State-Owned Enterprises. Our
									projects experience varied from railroads to fiber optic cable, from general cargo to hazardous and
									explosive, from special and heavy vehicles to aircraft.
								</p>
							</li>
							<li>
								<p>
									<strong>PT. CERINDO GUNAWAN LINTAS</strong>
								</p>
								<p>
									PT. CERINDO GUNAWAN LINTAS, were founded in 2005 and started to provide domestic transportation
									services, including land (trucking), sea and air, to/from cities and remote areas in the territory of
									the Republic Indonesia. We are certified in handling and delivery of dangerous, hazardous, harmful
									cargos.
								</p>
							</li>
						</ol>
						<p>
							CERINDO apprehends that the key success of transporting goods worldwide requires a solid and committed
							agency networks. With respect to this cumpolsary, we have been registered as a member of GLA (Global
							Logistics Association) since 2000. Consisting of seventy members all over the world, GLA –an International
							forwarding network - is an agency of international forwarders conducting roles as partners to support each
							other.
						</p>
						<p>
							CERINDO has an adaptable organization and system, competent experts and dedicated staff, reliable to the
							readiness of infrastructure, facilities, and tools to provide excellent services enabled by our IT system.
						</p>
						<p>
							CERINDO responds the challenge of global competition by developing capabilities from time to time, and be
							more and more confident to be your reliable partner in handling whatever cargo you have with the best
							care.
						</p>
					</article>
				</div>
			</div>
			<div className="w-full border-t border-slate-300 bg-slate-50">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
					<div className="w-full">
						<h3 className="text-center">Cerindo Team</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutUs;

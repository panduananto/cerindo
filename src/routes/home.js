import React, { Fragment } from 'react';

import Jumbotron from '../components/Jumbotron';
import ClientSection from '../components/ClientSection';
import ProjectSection from '../components/ProjectsSection/ProjectSection';
import SectionTitle from '../components/SectionTitle';
import ServiceSection from '../components/ServiceSection';
import GetInTouchSection from '../components/GetInTouchSection';

function Home() {
	return (
		<Fragment>
			<Jumbotron></Jumbotron>
			<section id="client" className="w-full bg-white">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
					<SectionTitle
						title="Take a look at our clients"
						subTitle="We did a great job with these companies. You can be the next to work with us!"
						keywordRed="clients"
					></SectionTitle>
					<ClientSection></ClientSection>
				</div>
			</section>
			<section id="service" className="w-full bg-slate-50">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
					<SectionTitle
						title="Services offered to your business"
						subTitle="We provide the best in class services for our customers."
						keywordRed="Services"
					></SectionTitle>
					<ServiceSection></ServiceSection>
				</div>
			</section>
			<section id="project">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
					<SectionTitle
						title="Our latest project"
						subTitle="Check out some of our featured projects we have been and currently working on."
						keywordRed="project"
					></SectionTitle>
					<ProjectSection></ProjectSection>
				</div>
			</section>
			<section id="get-in-touch">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
					<GetInTouchSection></GetInTouchSection>
				</div>
			</section>
		</Fragment>
	);
}

export default Home;

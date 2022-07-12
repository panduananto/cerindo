import React from 'react';

import NavigationBar from './components/Navigation/NavigationBar';
import Jumbotron from './components/Jumbotron';
import SectionTitle from './components/SectionTitle';
import ClientSection from './components/ClientSection';

function App() {
	return (
		<div className="flex h-full flex-col">
			<NavigationBar></NavigationBar>
			<main className="w-full">
				<Jumbotron></Jumbotron>
				<section id="client" className="w-full bg-white">
					<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
						<SectionTitle
							title="Take a look at our clients"
							subTitle="We did a great job with these companies. You can be the next to work with us!"
						></SectionTitle>
						<ClientSection></ClientSection>
					</div>
				</section>
				<section id="service" className="w-full bg-slate-50">
					<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
						<SectionTitle
							title="Services offered to your business"
							subTitle="We provide the best in class services for our customers."
						></SectionTitle>
					</div>
				</section>
			</main>
		</div>
	);
}

export default App;

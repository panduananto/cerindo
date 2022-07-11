import React from 'react';

import NavigationBar from './components/Navigation/NavigationBar';
import Jumbotron from './components/Jumbotron';
import SectionTitle from './components/SectionTitle';
import ClientSection from './components/ClientSection';

function App() {
	return (
		<div className="flex h-full flex-col">
			<NavigationBar></NavigationBar>
			<Jumbotron></Jumbotron>
			<section id="client" className="w-full bg-white">
				<div className="mx-auto flex max-w-6xl flex-col items-center py-4 px-4 sm:px-6 md:py-7 lg:px-8">
					<SectionTitle
						title="Take a look at our clients"
						subTitle="We did a great job with these companies. You can be the next to work with us!"
					></SectionTitle>
					<ClientSection></ClientSection>
				</div>
			</section>
		</div>
	);
}

export default App;

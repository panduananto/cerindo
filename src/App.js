import React from 'react';

import NavigationBar from './components/Navigation/NavigationBar';
import Jumbotron from './components/Jumbotron';

function App() {
	return (
		<div className="flex h-full flex-col">
			<NavigationBar></NavigationBar>
			<Jumbotron></Jumbotron>
		</div>
	);
}

export default App;

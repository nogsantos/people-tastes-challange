import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Swapi, Punkapi } from '../index';

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/swapi" component={Swapi} />
			<Route path="/punkapi" component={Punkapi} />
		</Switch>
	</main>
);

export default Main;

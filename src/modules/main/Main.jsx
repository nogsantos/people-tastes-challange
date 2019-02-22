import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Swapi, Punkapi, PunkapiDetails, MyFavorites } from '../index';

const Main = () => (
	<main>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/swapi" component={Swapi} />
			<Route exact path="/punkapi" component={Punkapi} />
			<Route exact path="/punkapi/details/:id" component={PunkapiDetails} />
			<Route exact path="/my-favorites" component={MyFavorites} />
		</Switch>
	</main>
);

export default Main;

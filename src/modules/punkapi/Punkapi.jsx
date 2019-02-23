import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import { ErrorHandler } from '../message-handlers/index';
import { AppCard } from '../../components/';
import { withRouter } from 'react-router';

import { MockList } from './Mock';

const cache = setupCache({
	maxAge: 15 * 60 * 1000
});
const api = axios.create({
	adapter: cache.adapter
});

class Punkapi extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			page: 1,
			punkapiList: []
		};
	}

	componentDidMount() {
		this.getValues();
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			let nextPage = this.state.page + 1;
			this.setState({ page: nextPage });
			this.getValues();
		}
	};

	getValues = () => {
		api({
			url: `${process.env.REACT_APP_PUNKAPI_ADDRESS}/beers?page=${this.state.page}&per_page=10`,
			method: 'get'
		})
			.then(async beers => {
				let currentList = this.state.punkapiList;
				currentList.push(...beers.data);
				this.setState({
					punkapiList: currentList,
					loading: false
				});
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
			});
	};

	render() {
		const { punkapiList } = this.state;
		return (
			<Fragment>
				<Typography variant="h3" gutterBottom>
					Punkapi
				</Typography>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start">
					{punkapiList.map(beer => {
						return (
							<Grid key={beer.id} item sm={6} xs={12}>
								<AppCard
									id={beer.id}
									name={beer.name}
									tagline={beer.tagline}
									description={beer.description}
									image_url={beer.image_url}
								/>
							</Grid>
						);
					})}
				</Grid>
			</Fragment>
		);
	}
}

export default withRouter(Punkapi);

import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import { ErrorHandler } from '../message-handlers/index';
import { AppCard } from '../../components/';
import { withRouter } from 'react-router';

import { MockList } from './Mock';
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
		// this.getValues();

		this.setState({
			punkapiList: MockList()
		});
	}

	getValues = () => {
		this.setState({ loading: true });
		axios
			.get(`${process.env.REACT_APP_PUNKAPI_ADDRESS}/beers?page=${this.state.page}&per_page=10`)
			.then(beers => {
				this.setState({
					punkapiList: beers.data,
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

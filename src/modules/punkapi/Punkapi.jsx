import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import { ErrorHandler } from '../message-handlers/index';

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
			<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={24}>
				<Grid item sm={12} xs={12}>
					<Typography variant="h4">Punkapi</Typography>
					{punkapiList.map(beer => {
						return (
							<Fragment>
								<span>{beer.name}</span>
								<img width="40" src={beer.image_url} alt={beer.name} />
							</Fragment>
						);
					})}
				</Grid>
			</Grid>
		);
	}
}

export default Punkapi;

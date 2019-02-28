import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import { ErrorHandler, SuccessHandler } from '../message-handlers/index';
import { AppCard, AppInput } from '../../components/';
import { withRouter } from 'react-router';

const cache = setupCache({
	maxAge: 15 * 60 * 1000
});
const api = axios.create({
	adapter: cache.adapter
});

const styles = theme => ({
	keepTopBar: {
		position: 'fixed',
		backgroundColor: '#fff',
		width: '95%',
		zIndex: '999',
		top: '63px',
		padding: '15px',
		left: '5%',
		borderBottom: '1px solid #f3eeee'
	}
});
class Punkapi extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			page: 1,
			beerName: '',
			keepTopBar: false,
			punkapiList: []
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getBeers();
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (this.state.beerName === '' && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			this.setState({ page: this.state.page + 1 }, newState => this.getBeers());
		}
		if (window.scrollY < 10) {
			this.setState({ keepTopBar: false });
		} else {
			this.setState({ keepTopBar: true });
		}
	};

	getBeers = () => {
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

	getBeersByName() {
		api({
			url: `${process.env.REACT_APP_PUNKAPI_ADDRESS}beers?beer_name=${this.state.beerName
				.replace(' ', '_')
				.toLowerCase()}`,
			method: 'get'
		})
			.then(async beers => {
				if (beers.data.length > 0) {
					this.setState({
						punkapiList: beers.data,
						loading: false
					});
				} else {
					new SuccessHandler(`Sorry, no beer founded with the name ${this.state.beerName}`).dispatcher();
				}
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
			});
	}

	handleSearchInput = event => {
		this.setState({ beerName: event.target.value });
	};

	handleSearchSubmit = event => {
		event.preventDefault();
		if (this.state.beerName !== '') {
			this.getBeersByName();
		} else {
			this.setState({ page: 1, punkapiList: [] }, newState => this.getBeers());
		}
	};

	render() {
		const { punkapiList, beerName, keepTopBar } = this.state;
		const { classes } = this.props;
		return (
			<Grid container direction="row" justify="flex-start" alignItems="flex-start">
				<Grid item sm={12} xs={12}>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="flex-start"
						className={keepTopBar ? classes.keepTopBar : ''}
					>
						<Grid item sm={6} xs={12}>
							<Typography variant="h3" gutterBottom>
								Beers
							</Typography>
						</Grid>
						<Grid item sm={6} xs={12}>
							<form noValidate autoComplete="off" onSubmit={this.handleSearchSubmit}>
								<AppInput
									id="punkapi-list-filter"
									label="Search Beers by Name"
									value={beerName}
									isTypeSearch={true}
									onChange={this.handleSearchInput}
								/>
							</form>
						</Grid>
					</Grid>
					<Divider variant="fullWidth" />
				</Grid>
				{punkapiList.map(beer => {
					return (
						<Grid key={beer.id} item sm={6} xs={12}>
							<AppCard
								id={beer.id}
								name={beer.name}
								tagline={beer.tagline}
								description={beer.description}
								image_url={beer.image_url}
								module="punkapi"
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(Punkapi));

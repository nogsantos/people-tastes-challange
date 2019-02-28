import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import { ErrorHandler } from '../message-handlers/index';
import { AppCard } from '../../components/';

import { CategoryIconsService } from '../../services/';

const cache = setupCache({
	maxAge: 15 * 60 * 1000
});
const api = axios.create({
	adapter: cache.adapter
});

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	listContainer: {
		marginBottom: '10rem'
	},
	card: {
		position: 'relative',
		padding: '2rem',
		margin: 0
	},
	selected: {
		backgroundColor: '#f3f3f3'
	}
});

class Swapi extends Component {
	constructor(props) {
		super(props);

		this.loaderCounter = 0;

		this.state = {
			loading: false,
			apiListKeys: [],
			apiListValue: [],
			category: null,
			nextPage: null,
			swapiList: []
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getApiList();
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		if (
			this.state.category !== null &&
			this.state.nextPage !== null &&
			window.innerHeight + window.scrollY >= document.body.offsetHeight
		) {
			if (this.loaderCounter === 0) {
				this.loaderCounter++;
				this.getListByCategory(null, this.state.nextPage);
			}
		}
	};

	getApiList = () => {
		api({
			url: `${process.env.REACT_APP_SWAPI_ADDRESS}`,
			method: 'get'
		})
			.then(swapiList => {
				this.setState({
					apiListKeys: Object.keys(swapiList.data),
					apiListValue: swapiList.data
				});
			})
			.catch(error => {
				new ErrorHandler(error).catcher();
			});
	};

	getListByCategory = (category, nextPage) => {
		this.setState({ loading: true });
		let urlTarget = nextPage;
		if (!nextPage && category !== null) {
			let list = this.state.apiListValue;
			this.setState({
				category: category,
				swapiList: []
			});
			urlTarget = list[category];
		}
		api({
			url: `${urlTarget}`,
			method: 'get'
		})
			.then(response => {
				let currentList = this.state.swapiList;
				currentList.push(...response.data.results);
				this.setState({
					loading: false,
					swapiList: currentList,
					nextPage: response.data.next
				});
				this.resetLoaderCounter();
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
				this.resetLoaderCounter();
			});
	};

	/**
	 * Resets loader counter. Loading a page once per time
	 */
	resetLoaderCounter = () => {
		if (this.loaderCounter > 0) {
			this.loaderCounter = 0;
		}
	};

	itemIdMaker = (category, url) => {
		let idGetter = url.match(/\d+/g);
		return `${category}=${idGetter[0]}`;
	};

	render() {
		const { apiListKeys, swapiList, loading, category } = this.state;
		const { classes } = this.props;
		return (
			<Grid
				className={classes.listContainer}
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-start"
				spacing={8}
			>
				<Grid item sm={12} xs={12}>
					<Typography variant="h3">Star Wars</Typography>
					<Divider variant="fullWidth" />
				</Grid>
				<Grid item sm={12} xs={12}>
					<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
						<Grid item sm={12} xs={12}>
							<Typography variant="h5">Choose a category</Typography>
						</Grid>
						{Object.entries(apiListKeys).map(list => {
							return (
								<Grid key={list[0]} item sm={4} xs={12}>
									<CardActionArea onClick={() => this.getListByCategory(list[1])}>
										<Paper
											className={`${classes.card} ${list[1] === this.state.category ? classes.selected : null}`}
											elevation={list[1] === this.state.category ? 6 : 1}
										>
											<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
												<CategoryIconsService category={list[1]} />
												<Typography variant="h6">{list[1].toUpperCase()}</Typography>
											</Grid>
										</Paper>
									</CardActionArea>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
				{swapiList.map((swapi, index) => {
					let itemId = this.itemIdMaker(category, swapi.url);
					return (
						<Grid key={index} item sm={6} xs={12}>
							<AppCard
								id={itemId}
								name={swapi.name || swapi.title}
								tagline={
									swapi.birth_year || swapi.terrain || swapi.director || swapi.classification || swapi.manufacturer
								}
								module="swapi"
								category={category}
							/>
						</Grid>
					);
				})}
				{loading && (
					<Grid item sm={12} xs={12}>
						<div className={classes.root}>
							<LinearProgress variant="query" />
						</div>
					</Grid>
				)}
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(Swapi));

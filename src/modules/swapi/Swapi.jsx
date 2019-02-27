import React, { Component, Fragment } from 'react';
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
	card: {
		position: 'relative',
		padding: '2rem',
		margin: 0
	}
});

class Swapi extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			apiListKeys: [],
			apiListValue: [],
			category: null,
			swapiList: []
		};
	}

	componentDidMount() {
		this.getApiList();
	}

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

	getListByCategory = category => {
		let list = this.state.apiListValue;
		this.setState({ loading: true, category: category });
		api({
			url: `${list[category]}`,
			method: 'get'
		})
			.then(response => {
				this.setState({
					loading: false,
					swapiList: response.data.results
				});
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
			});
	};

	render() {
		const { apiListKeys, swapiList, loading, category } = this.state;
		const { classes } = this.props;
		return (
			<Fragment>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={8}>
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
											<Paper className={classes.card} elevation={1}>
												<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={16}>
													{new CategoryIconsService(list[1]).getIcon()}{' '}
													<Typography variant="h6">{list[1].toUpperCase()}</Typography>
												</Grid>
											</Paper>
										</CardActionArea>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
					{loading ? (
						<Grid item sm={12} xs={12}>
							<div className={classes.root}>
								<LinearProgress variant="query" />
							</div>
						</Grid>
					) : (
						swapiList.map((swapi, index) => {
							return (
								<Grid item key={index} sm={6} xs={12}>
									<AppCard
										id={(swapi.name || swapi.title)
											.trim()
											.replace(/[`'-/\s]/g, '_')
											.toLowerCase()}
										name={swapi.name || swapi.title}
										tagline={
											swapi.birth_year || swapi.terrain || swapi.director || swapi.classification || swapi.manufacturer
										}
										module="swapi"
										category={category}
									/>
								</Grid>
							);
						})
					)}
				</Grid>
			</Fragment>
		);
	}
}

export default withStyles(styles)(withRouter(Swapi));

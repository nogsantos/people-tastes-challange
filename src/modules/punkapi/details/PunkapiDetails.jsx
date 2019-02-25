import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import teal from '@material-ui/core/colors/teal';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import FavoriteService from '../../../services/favorite/FavoriteService';
import { ErrorHandler } from '../../message-handlers/index';
import { Image } from './Style';
import { TableContainer } from '../../../AppStyle';
import { DetailsStatelessRender } from './DetailsStatelessRender';

// import { MockBeer } from '../Mock';

const cache = setupCache({
	maxAge: 15 * 60 * 1000
});
const api = axios.create({
	adapter: cache.adapter
});

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	},
	iconHover: {
		margin: theme.spacing.unit * 2,
		'&:hover': {
			color: teal[800]
		}
	},
	body: {
		marginTop: 20
	},
	pTop10: {
		paddingTop: 10
	},
	p10: {
		padding: 10
	},
	author: {
		textAlign: 'right',
		paddingTop: 10
	},
	lightTooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 12
	}
});

class PunkapiDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: null,
			favorited: false,
			beer: {}
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	componentWillMount() {
		if (this.props.match.params.id) {
			this.getDetail(this.props.match.params.id);
		}

		// this.setState({ beer: Object.assign({}, MockBeer()) }, () => this.checkIfIsFavorited());
	}

	getDetail = id => {
		this.setState({ loading: true });

		api({
			url: `${process.env.REACT_APP_PUNKAPI_ADDRESS}/beers/${id}`,
			method: 'get'
		})
			.then(async beer => {
				this.setState(
					{
						beer: Object.assign({}, ...beer.data),
						loading: false
					},
					() => this.checkIfIsFavorited()
				);
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
			});
	};

	checkIfIsFavorited() {
		new FavoriteService('punkapi').getFavoriteById(this.state.beer.id).then(favorite => {
			this.setState({
				favorited: favorite && favorite.id !== null
			});
		});
	}

	handleFavorite = () => {
		if (this.state.favorited) {
			this.removeFromFavorites();
		} else {
			this.addToFavorites();
		}
	};

	addToFavorites = () =>
		new FavoriteService('punkapi').addToFavorites(
			{ id: this.state.beer.id, name: this.state.beer.name, image_url: this.state.beer.image_url },
			this.favoriteStateManager
		);

	removeFromFavorites = () =>
		new FavoriteService('punkapi').removeFromFavorites(this.state.beer.id, this.favoriteStateManager);

	favoriteStateManager = () => {
		this.setState(state => ({ favorited: !state.favorited }));
	};

	render() {
		const {
			name,
			description,
			image_url,
			method,
			ingredients,
			food_pairing,
			brewers_tips,
			contributed_by
		} = this.state.beer;
		const { classes } = this.props;
		return (
			<Fragment>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
					<Grid item sm={3}>
						<Paper className={classes.root} elevation={1}>
							<Image image={image_url} />
						</Paper>
					</Grid>
					<Grid item sm={9}>
						<Paper className={classes.root} elevation={1}>
							<Grid item sm={12}>
								<AppBar position="static" color="default">
									<Toolbar>
										<Grid container direction="row" justify="space-between" alignItems="center">
											<Typography variant="h6" color="inherit">
												{name}{' '}
												{ingredients && ingredients.yeast && (
													<Typography variant="body2">{ingredients.yeast}</Typography>
												)}
											</Typography>
											<Tooltip
												placement="bottom"
												title={this.state.favorited ? 'Liked' : 'Like'}
												aria-label={this.state.favorited ? 'Liked' : 'Like'}
												classes={{ tooltip: classes.lightTooltip }}
											>
												<IconButton
													aria-label={this.state.favorited ? 'Liked' : 'Like'}
													className={classes.iconHover}
													onClick={this.handleFavorite}
													color={this.state.favorited ? 'primary' : 'default'}
												>
													<FavoriteIcon />
												</IconButton>
											</Tooltip>
										</Grid>
									</Toolbar>
								</AppBar>
							</Grid>
							<Grid item sm={12} className={classes.body}>
								<Grid container direction="row" justify="flex-start" alignItems="flex-start">
									{description && (
										<Grid item sm={12}>
											<Typography variant="body1" gutterBottom>
												{description}
											</Typography>
										</Grid>
									)}
									<Grid item sm={8} className={classes.p10}>
										<Typography variant="h5" gutterBottom>
											Ingredients
										</Typography>
										{ingredients && (
											<Fragment>
												{ingredients.malt && (
													<Fragment>
														<Typography variant="h6" gutterBottom>
															Malte
														</Typography>
														<TableContainer>
															<table className="highlight">
																<thead>
																	<tr>
																		<th>
																			<Typography variant="subtitle2">Name</Typography>
																		</th>
																		<th>
																			<Typography variant="subtitle2">Value</Typography>
																		</th>
																		<th>
																			<Typography variant="subtitle2">Unit</Typography>
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{ingredients.malt.map((malt, index) => {
																		return (
																			<tr key={index}>
																				<td>
																					<Typography variant="subtitle1">{malt.name}</Typography>
																				</td>
																				<td>
																					<Typography variant="subtitle1">{malt.amount.value}</Typography>
																				</td>
																				<td>
																					<Typography variant="subtitle1">{malt.amount.unit}</Typography>
																				</td>
																			</tr>
																		);
																	})}
																</tbody>
															</table>
														</TableContainer>
													</Fragment>
												)}
												{ingredients.hops && (
													<Fragment>
														<Typography variant="h6" gutterBottom>
															Hops
														</Typography>
														<TableContainer>
															<table className="highlight">
																<thead>
																	<tr>
																		<th>
																			<Typography variant="subtitle2">Name</Typography>
																		</th>
																		<th>
																			<Typography variant="subtitle2">Value</Typography>
																		</th>
																		<th>
																			<Typography variant="subtitle2">Unit</Typography>
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{ingredients.hops.map((hops, index) => {
																		return (
																			<tr key={index}>
																				<td>
																					<Typography variant="subtitle1">{hops.name}</Typography>
																				</td>
																				<td>
																					<Typography variant="subtitle1">{hops.amount.value}</Typography>
																				</td>
																				<td>
																					<Typography variant="subtitle1">{hops.amount.unit}</Typography>
																				</td>
																			</tr>
																		);
																	})}
																</tbody>
															</table>
														</TableContainer>
													</Fragment>
												)}
											</Fragment>
										)}
										{method && (
											<Grid item sm={12}>
												{method.mash_temp && (
													<Fragment>
														{method.mash_temp.map((result, index) => {
															return (
																<Fragment key={index}>
																	{result.temp.value && (
																		<Typography variant="body2">Temp value: {result.temp.value}</Typography>
																	)}
																	{result.temp.unit && (
																		<Typography variant="body2">Temp unit: {result.temp.unit}</Typography>
																	)}
																	{result.duration && (
																		<Typography variant="body2">Temp duraction: {result.duration}</Typography>
																	)}
																</Fragment>
															);
														})}
													</Fragment>
												)}
												{method.fermentation.temp.value && (
													<Typography variant="body2">
														Temp Fermentation: {method.fermentation.temp.value} {method.fermentation.temp.unit}{' '}
														{method.twist}
													</Typography>
												)}
											</Grid>
										)}
									</Grid>
									<Grid item sm={4}>
										<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
											<Grid item sm={12}>
												<DetailsStatelessRender {...this.state.beer} />
											</Grid>
											{food_pairing && (
												<Grid item sm={12}>
													<Paper elevation={1} className={classes.p10}>
														<List dense={true}>
															<Typography variant="h6" gutterBottom>
																Food recomendations
															</Typography>
															{food_pairing.map((food, index) => {
																return (
																	<Typography variant="body2" key={index}>
																		{food}
																	</Typography>
																);
															})}
														</List>
													</Paper>
												</Grid>
											)}
											{brewers_tips && (
												<Grid item sm={12}>
													<Paper elevation={1} className={classes.p10}>
														<List dense={true}>
															<Typography variant="h6" gutterBottom>
																Brewers tips
															</Typography>
															<Typography variant="body2">{brewers_tips}</Typography>
														</List>
													</Paper>
												</Grid>
											)}
										</Grid>
									</Grid>
									{contributed_by && (
										<Grid item sm={12} className={classes.pTop10}>
											<Divider variant="fullWidth" />
											<Typography variant="body2" className={classes.author}>
												Contributed by: {contributed_by}
											</Typography>
										</Grid>
									)}
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default withStyles(styles)(PunkapiDetails);

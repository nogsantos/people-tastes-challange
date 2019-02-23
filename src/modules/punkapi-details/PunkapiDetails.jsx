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

import axios from 'axios';

import { ErrorHandler } from '../message-handlers/index';
import { Image } from './Style';
import { TableContainer } from '../../AppStyle';
import { DetailsStatelessRender } from './DetailsStatelessRender';

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
	p10: {
		padding: 10
	},
	author: {
		textAlign: 'right',
		paddingTop: 10
	}
});

class PunkapiDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: null,
			beer: {}
			// 	beer: {
			// 		id: 8,
			// 		name: 'Fake Lager',
			// 		tagline: 'Bohemian Pilsner.',
			// 		first_brewed: '03/2013',
			// 		description:
			// 			'Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Say hello to Fake Lager – a zesty, floral 21st century faux masterpiece with added BrewDog bitterness.',
			// 		image_url: 'https://images.punkapi.com/v2/8.png',
			// 		abv: 4.7,
			// 		ibu: 40,
			// 		target_fg: 1010,
			// 		target_og: 1046,
			// 		ebc: 12,
			// 		srm: 6,
			// 		ph: 4.4,
			// 		attenuation_level: 78,
			// 		volume: { value: 20, unit: 'liters' },
			// 		boil_volume: { value: 25, unit: 'liters' },
			// 		method: {
			// 			mash_temp: [{ temp: { value: 65, unit: 'celsius' }, duration: 75 }],
			// 			fermentation: { temp: { value: 10, unit: 'celsius' } },
			// 			twist: null
			// 		},
			// 		ingredients: {
			// 			malt: [
			// 				{ name: 'Extra Pale', amount: { value: 3.33, unit: 'kilograms' } },
			// 				{ name: 'Munich', amount: { value: 0.42, unit: 'kilograms' } },
			// 				{ name: 'Caramalt', amount: { value: 0.28, unit: 'kilograms' } },
			// 				{ name: 'Acidulated Malt', amount: { value: 0.07, unit: 'kilograms' } }
			// 			],
			// 			hops: [
			// 				{ name: 'Magnum', amount: { value: 7.5, unit: 'grams' }, add: 'start', attribute: 'bitter' },
			// 				{ name: 'Magnum', amount: { value: 5, unit: 'grams' }, add: 'middle', attribute: 'flavour' },
			// 				{ name: 'Hersbrucker', amount: { value: 6.25, unit: 'grams' }, add: 'middle', attribute: 'flavour' },
			// 				{ name: 'Saaz', amount: { value: 6.25, unit: 'grams' }, add: 'middle', attribute: 'flavour' },
			// 				{ name: 'Hersbrucker', amount: { value: 18.75, unit: 'grams' }, add: 'end', attribute: 'flavour' },
			// 				{ name: 'Saaz', amount: { value: 18.75, unit: 'grams' }, add: 'end', attribute: 'flavour' }
			// 			],
			// 			yeast: 'Wyeast 2007 - Pilsen Lager™'
			// 		},
			// 		food_pairing: [
			// 			'Fried crab cakes with avocado salsa',
			// 			'Spicy shredded pork roll with hot dipping sauce',
			// 			'Key lime pie'
			// 		],
			// 		brewers_tips:
			// 			'Once the primary fermentation is complete get this beer as cold as you can and let it mature for as long as you ve got.',
			// 		contributed_by: 'Sam Mason <samjbmason>'
			// 	}
		};
	}

	componentWillMount() {
		if (this.props.match.params.id) {
			this.getDetail(this.props.match.params.id);
		}
	}

	getDetail = id => {
		this.setState({ loading: true });
		axios
			.get(`${process.env.REACT_APP_PUNKAPI_ADDRESS}/beers/${id}`)
			.then(beer => {
				console.log(beer.data);
				this.setState({
					beer: Object.assign({}, ...beer.data),
					loading: false
				});
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
			});
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
											<IconButton
												aria-label="Curtir"
												className={classes.iconHover}
												onClick={this.handleFavorite}
												color={this.state.favorited ? 'primary' : 'default'}
											>
												<FavoriteIcon />
											</IconButton>
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
										<Grid item sm={12}>
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

import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import { ErrorHandler } from '../message-handlers/index';

class PunkapiDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: null,
			// beer: {}
			beer: {
				id: 8,
				name: 'Fake Lager',
				tagline: 'Bohemian Pilsner.',
				first_brewed: '03/2013',
				description:
					'Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Say hello to Fake Lager – a zesty, floral 21st century faux masterpiece with added BrewDog bitterness.',
				image_url: 'https://images.punkapi.com/v2/8.png',
				abv: 4.7,
				ibu: 40,
				target_fg: 1010,
				target_og: 1046,
				ebc: 12,
				srm: 6,
				ph: 4.4,
				attenuation_level: 78,
				volume: { value: 20, unit: 'liters' },
				boil_volume: { value: 25, unit: 'liters' },
				method: {
					mash_temp: [{ temp: { value: 65, unit: 'celsius' }, duration: 75 }],
					fermentation: { temp: { value: 10, unit: 'celsius' } },
					twist: null
				},
				ingredients: {
					malt: [
						{ name: 'Extra Pale', amount: { value: 3.33, unit: 'kilograms' } },
						{ name: 'Munich', amount: { value: 0.42, unit: 'kilograms' } },
						{ name: 'Caramalt', amount: { value: 0.28, unit: 'kilograms' } },
						{ name: 'Acidulated Malt', amount: { value: 0.07, unit: 'kilograms' } }
					],
					hops: [
						{ name: 'Magnum', amount: { value: 7.5, unit: 'grams' }, add: 'start', attribute: 'bitter' },
						{ name: 'Magnum', amount: { value: 5, unit: 'grams' }, add: 'middle', attribute: 'flavour' },
						{ name: 'Hersbrucker', amount: { value: 6.25, unit: 'grams' }, add: 'middle', attribute: 'flavour' },
						{ name: 'Saaz', amount: { value: 6.25, unit: 'grams' }, add: 'middle', attribute: 'flavour' },
						{ name: 'Hersbrucker', amount: { value: 18.75, unit: 'grams' }, add: 'end', attribute: 'flavour' },
						{ name: 'Saaz', amount: { value: 18.75, unit: 'grams' }, add: 'end', attribute: 'flavour' }
					],
					yeast: 'Wyeast 2007 - Pilsen Lager™'
				},
				food_pairing: [
					'Fried crab cakes with avocado salsa',
					'Spicy shredded pork roll with hot dipping sauce',
					'Key lime pie'
				],
				brewers_tips:
					'Once the primary fermentation is complete get this beer as cold as you can and let it mature for as long as you ve got.',
				contributed_by: 'Sam Mason <samjbmason>'
			}
		};
	}

	componentWillMount() {
		if (this.props.match.params.id) {
			// this.getDetail(this.props.match.params.id);
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
		console.log('state', this.state.beer);
		const {
			name,
			description,
			agline,
			first_brewed,
			image_url,
			abv,
			ibu,
			target_fg,
			target_og,
			ebc,
			srm,
			ph,
			attenuation_level,
			volume,
			boil_volume,
			method,
			ingredients,
			food_pairing,
			brewers_tips,
			contributed_by
		} = this.state.beer;
		return (
			<Fragment>
				<Typography variant="h3">{name}</Typography>
				<Grid container direction="row" justify="flex-start" alignItems="flex-start">
					<Grid item sm={12}>
						<Typography variant="body1">{description}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{agline}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{first_brewed}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{image_url}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{abv}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{ibu}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{target_fg}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{target_og}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{ebc}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{srm}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{ph}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{attenuation_level}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">
							{volume.value}
							{volume.unit}
						</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">
							{boil_volume.value}
							{boil_volume.unit}
						</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">
							{method.mash_temp.map(result => {
								return (
									<div>
										<p>{result.temp.value}</p>
										<p>{result.temp.unit}</p>
										<p>{result.duration}</p>
									</div>
								);
							})}
							{method.fermentation.temp.value}
							{method.fermentation.temp.unit}
							{method.twist}
						</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">
							<div>
								<ul>
									<li>Malte</li>
									{ingredients.malt.map(malt => {
										return (
											<ul>
												<li>
													Name: {malt.name}, Ammount value: {malt.amount.value}, Ammount unit: {malt.amount.unit}
												</li>
											</ul>
										);
									})}
								</ul>
								<ul>
									<li>Hops</li>
									{ingredients.hops.map(hops => {
										return (
											<ul>
												<li>
													Name: {hops.name}, Ammount value: {hops.amount.value}, Ammount unit: {hops.amount.unit}, Hops
													add: {hops.add}, Attributes: {hops.attribute}
												</li>
											</ul>
										);
									})}
								</ul>
								<p>{ingredients.yeast}</p>
							</div>
						</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">
							{food_pairing.map(food => {
								return <p>{food}</p>;
							})}
						</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{brewers_tips}</Typography>
					</Grid>
					<Grid item sm={12}>
						<Typography variant="body2">{contributed_by}</Typography>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default PunkapiDetails;

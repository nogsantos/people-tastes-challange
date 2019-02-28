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
import Tooltip from '@material-ui/core/Tooltip';

import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

import FavoriteService from '../../../services/favorite/FavoriteService';
import { ErrorHandler } from '../../message-handlers/index';

import { People } from './categories/People';
import { Planets } from './categories/Planets';
import { Films } from './categories/Films';
import { Species } from './categories/Species';
import { Vehicles } from './categories/Vehicles';
import { StarShips } from './categories/StarShips';

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
	details: {
		marginTop: 20
	},
	lightTooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 12
	}
});

class SwapiDetails extends Component {
	constructor(props) {
		super(props);

		this.CATEGORY = 0;
		this.ID = 1;

		this.state = {
			loading: true,
			id: null,
			category: null,
			favorited: false,
			swapi: {}
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	componentWillMount() {
		if (this.props.match.params.id) {
			let getId = this.props.match.params.id.split('=');
			this.setState({ id: this.props.match.params.id, category: getId[this.CATEGORY] });
			this.getDetail(getId[this.CATEGORY], getId[this.ID]);
		}
	}

	getDetail = (category, id) => {
		this.setState({ loading: true });

		api({
			url: `${process.env.REACT_APP_SWAPI_ADDRESS}${category}/${id}`,
			method: 'get'
		})
			.then(swapi => {
				this.setState(
					{
						swapi: Object.assign({}, swapi.data),
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
		new FavoriteService('swapi').getFavoriteById(this.state.id).then(favorite => {
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
		new FavoriteService('swapi').addToFavorites(
			{ id: this.state.id, name: this.state.swapi.name || this.state.swapi.title, category: this.state.category },
			this.favoriteStateManager
		);

	removeFromFavorites = () =>
		new FavoriteService('swapi').removeFromFavorites(this.state.id, this.favoriteStateManager);

	favoriteStateManager = () => {
		this.setState(state => ({ favorited: !state.favorited }));
	};

	CategoryDetailsRender = props => {
		let child = null;
		switch (this.state.category) {
			case 'people':
				child = <People {...props} />;
				break;
			case 'planets':
				child = <Planets {...props} />;
				break;
			case 'films':
				child = <Films {...props} />;
				break;
			case 'species':
				child = <Species {...props} />;
				break;
			case 'vehicles':
				child = <Vehicles {...props} />;
				break;
			case 'starships':
				child = <StarShips {...props} />;
				break;
			default:
				child = <Fragment />;
				break;
		}
		return child;
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
				<Grid item sm={12}>
					<Paper className={classes.root} elevation={1}>
						<Grid item sm={12}>
							<AppBar position="static" color="default">
								<Toolbar>
									<Grid container direction="row" justify="space-between" alignItems="center">
										<Typography variant="h6" color="inherit">
											{this.state.swapi.name || this.state.swapi.title}
											<Typography variant="body2">{this.state.category}</Typography>
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
						<Grid item sm={12} className={classes.details}>
							<this.CategoryDetailsRender>{this.state.swapi}</this.CategoryDetailsRender>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(SwapiDetails);

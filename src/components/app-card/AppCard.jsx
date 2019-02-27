import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import teal from '@material-ui/core/colors/teal';
import { withRouter } from 'react-router';

import FavoriteService from '../../services/favorite/FavoriteService';
import { ErrorHandler } from '../../modules/message-handlers/index';

const styles = theme => ({
	card: {
		position: 'relative',
		display: 'flex',
		maxHeight: 290,
		margin: 8
	},
	title: {
		marginTop: 10,
		marginLeft: 5
	},
	content: {
		flex: '1 0 auto',
		height: 210,
		overflowY: 'hidden',
		'&:hover': {
			overflowY: 'overlay'
		}
	},
	cover: {
		width: '100%',
		height: 265,
		margin: 10,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center'
	},
	actions: {
		padding: 'unset'
	},
	iconHover: {
		margin: theme.spacing.unit * 2,
		'&:hover': {
			color: teal[800]
		}
	},
	lightTooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 12
	}
});

class AppCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = { favorited: false };
	}

	componentWillMount() {
		this.getFavorites();
	}

	getFavorites = () => {
		if (this.props.module && this.props.id) {
			new FavoriteService(this.props.module).getFavoriteById(this.props.id).then(favorite => {
				this.setState({ favorited: favorite && favorite.id !== null });
			});
		} else {
			new ErrorHandler({
				response: {
					data: {
						status: 400,
						message: 'Sorry, an error occurred when tries to get favorite values'
					}
				}
			}).catcher();
		}
	};

	handleFavorite = () => {
		if (this.state.favorited) {
			this.removeFromFavorites();
		} else {
			this.addToFavorites();
		}
	};

	addToFavorites = () => {
		if (this.props.module) {
			let objectPersister = {
				id: this.props.id,
				name: this.props.name
			};

			if (this.props.image_url) {
				objectPersister.image_url = this.props.image_url;
			}

			if (this.props.category) {
				objectPersister.category = this.props.category;
			}

			new FavoriteService(this.props.module).addToFavorites(objectPersister, this.favoriteStateManager);
		} else {
			new ErrorHandler({
				response: {
					data: {
						status: 400,
						message: 'Sorry, an error occurred when tries to add a favorite values'
					}
				}
			}).catcher();
		}
	};

	removeFromFavorites = () => {
		if (this.props.module && this.props.id) {
			new FavoriteService(this.props.module).removeFromFavorites(this.props.id, this.favoriteStateManager);
		} else {
			new ErrorHandler({
				response: {
					data: {
						status: 400,
						message: 'Sorry, an error occurred when tries to removes from favorite values'
					}
				}
			}).catcher();
		}
	};

	favoriteStateManager = () => {
		this.setState(state => ({ favorited: !state.favorited }));
	};

	goToDetailsView = () => {
		if (this.props.module && this.props.id) {
			this.props.history.push(`/${this.props.module}/details/${this.props.id}`);
		} else {
			new ErrorHandler({
				response: {
					data: {
						status: 400,
						message: 'Sorry, an error occurred when tries to removes from favorite values'
					}
				}
			}).catcher();
		}
	};

	render() {
		const { classes } = this.props;

		return (
			<Card key={this.props.id} className={classes.card}>
				<CardActionArea onClick={this.goToDetailsView}>
					<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
						{this.props.image_url && (
							<Grid data-testid="image-card" item sm={3} xs={12}>
								<CardMedia
									className={classes.cover}
									height="140"
									image={this.props.image_url}
									title={this.props.name}
								/>
							</Grid>
						)}
						<Grid item sm={9} xs={12}>
							<Grid item sm={12} xs={12} className={classes.title}>
								<Typography variant="h5" gutterBottom>
									{this.props.name}
								</Typography>
								{this.props.tagline && (
									<Typography variant="caption" gutterBottom>
										{this.props.tagline}
									</Typography>
								)}
							</Grid>
							{this.props.description && (
								<CardContent className={classes.content}>
									<Grid item sm={12} xs={12}>
										<Typography variant="body1">{this.props.description}</Typography>
									</Grid>
								</CardContent>
							)}
						</Grid>
					</Grid>
				</CardActionArea>
				<CardActions className={classes.actions}>
					<Grid container direction="row" justify="center" alignItems="center">
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
				</CardActions>
			</Card>
		);
	}
}

AppCard.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	name: PropTypes.string.isRequired,
	module: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
	image_url: PropTypes.string,
	category: PropTypes.string,
	description: PropTypes.string
};

export default withStyles(styles)(withRouter(AppCard));

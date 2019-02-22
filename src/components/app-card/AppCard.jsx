import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import teal from '@material-ui/core/colors/teal';
import { withRouter } from 'react-router';

import LocalDb from '../../providers/local-db';

const styles = theme => ({
	card: {
		position: 'relative',
		display: 'flex',
		minHeight: 290,
		maxHeight: 290,
		margin: 8
	},
	title: {
		marginTop: 10
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
		LocalDb.punkapi.each(favorit => {
			if (favorit.id === this.props.id) {
				this.setState({ favorited: true });
			}
		});
	};

	handleFavorite = () => {
		if (this.state.favorited) {
			this.removeFromFavorites();
		} else {
			this.addToFavorites();
		}
	};

	addToFavorites = () =>
		LocalDb.punkapi
			.add({ id: this.props.id, name: this.props.name, image_url: this.props.image_url })
			.then(id => this.favoriteStateManager());

	removeFromFavorites = () => LocalDb.punkapi.delete(this.props.id).then(id => this.favoriteStateManager());

	favoriteStateManager = () => {
		this.setState(state => ({ favorited: !state.favorited }));
	};

	goToListView = () => {
		this.props.history.push(`/punkapi/details/${this.props.id}`);
	};

	render() {
		const { classes } = this.props;

		return (
			<Card key={this.props.id} className={classes.card}>
				<CardActionArea onClick={this.goToListView}>
					<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
						<Grid item sm={3} xs={12}>
							<CardMedia className={classes.cover} height="140" image={this.props.image_url} title={this.props.name} />
						</Grid>
						<Grid item sm={9} xs={12}>
							<Grid item sm={12} xs={12} className={classes.title}>
								<Typography variant="h5" gutterBottom>
									{this.props.name}
								</Typography>
								<Typography variant="caption" gutterBottom>
									{this.props.tagline}
								</Typography>
							</Grid>
							<CardContent className={classes.content}>
								<Grid item sm={12} xs={12}>
									<Typography variant="body1">{this.props.description}</Typography>
								</Grid>
							</CardContent>
						</Grid>
					</Grid>
				</CardActionArea>
				<CardActions className={classes.actions}>
					<Grid container direction="row" justify="center" alignItems="center">
						<Tooltip placement="bottom" title="Curtir" aria-label="Curtir" classes={{ tooltip: classes.lightTooltip }}>
							<IconButton
								aria-label="Curtir"
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
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	image_url: PropTypes.string.isRequired,
	tagline: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default withStyles(styles)(withRouter(AppCard));

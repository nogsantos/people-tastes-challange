import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withRouter } from 'react-router';
import teal from '@material-ui/core/colors/teal';
import Divider from '@material-ui/core/Divider';

import { CategoryIconsService, FavoriteService } from '../../services/';

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
		position: 'relative'
	},
	icon: {
		margin: theme.spacing.unit * 2,
		color: teal[800]
	}
});
class MyFavorites extends Component {
	constructor(props) {
		super(props);

		this.state = {
			swapiList: [],
			punkapiList: []
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getFavorites();
	}

	getFavorites = async () => {
		await Promise.all([
			new FavoriteService('swapi').getAllFavorites(),
			new FavoriteService('punkapi').getAllFavorites()
		]).then(responseData => {
			this.setState({ swapiList: responseData[0], punkapiList: responseData[1] });
		});
	};

	goToDetailsView = (target, id) => {
		this.props.history.push(`/${target}/details/${id}`);
	};

	render() {
		const { classes } = this.props;
		const { swapiList, punkapiList } = this.state;
		return (
			<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
				<Grid item sm={12} xs={12}>
					<Typography variant="h3">MyFavorites</Typography>
					<Divider variant="fullWidth" />
				</Grid>
				<Grid item sm={6} xs={12}>
					<Paper className={classes.paper}>
						<List dense={false}>
							{swapiList.length > 0 ? (
								swapiList.map(swapi => {
									return (
										<Fragment>
											<ListItem key={swapi.id} button onClick={() => this.goToDetailsView('swapi', swapi.id)}>
												<FavoriteIcon className={classes.icon} />
												<ListItemText primary={swapi.name} secondary={swapi.category} />
												<ListItemAvatar>{new CategoryIconsService(swapi.category).getIcon()}</ListItemAvatar>
											</ListItem>
											<Divider variant="inset" component="li" />
										</Fragment>
									);
								})
							) : (
								<Typography variant="body1">No Star wars items liked yet</Typography>
							)}
						</List>
					</Paper>
				</Grid>
				<Grid item sm={6} xs={12}>
					<Paper className={classes.paper}>
						<List dense={false}>
							{punkapiList.length > 0 ? (
								punkapiList.map(punkapi => {
									return (
										<Fragment>
											<ListItem key={punkapi.id} button onClick={() => this.goToDetailsView('punkapi', punkapi.id)}>
												<FavoriteIcon className={classes.icon} />
												<ListItemText primary={punkapi.name} />
												<ListItemAvatar>
													<Avatar alt={punkapi.name} src={punkapi.image_url} />
												</ListItemAvatar>
											</ListItem>
											<Divider variant="inset" component="li" />
										</Fragment>
									);
								})
							) : (
								<Typography variant="body1">No beers liked yet</Typography>
							)}
						</List>
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(MyFavorites));

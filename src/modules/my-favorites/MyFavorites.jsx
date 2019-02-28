import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import Divider from '@material-ui/core/Divider';

import { FavoriteService } from '../../services/';
import MyFavoritesDetails from './MyFavoritesDetails';

const styles = theme => ({
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
		position: 'relative'
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
					<Grid container direction="row" justify="space-between" alignItems="center" spacing={0}>
						<Grid item sm={6} xs={12}>
							<Typography variant="h6">Star Wars</Typography>
						</Grid>
						<Grid item sm={6} xs={12}>
							<Typography variant="body1">Score: {swapiList.length}</Typography>
						</Grid>
					</Grid>
					<Paper className={classes.paper}>
						{swapiList.length > 0 ? (
							swapiList.map(swapi => {
								return (
									<MyFavoritesDetails
										key={swapi.id}
										id={swapi.id}
										name={swapi.name}
										module="swapi"
										category={swapi.category}
										showSecondaryText={true}
										secondary={swapi.category}
									/>
								);
							})
						) : (
							<Typography variant="body1">No Star wars items liked yet</Typography>
						)}
					</Paper>
				</Grid>
				<Grid item sm={6} xs={12}>
					<Grid container direction="row" justify="space-between" alignItems="center" spacing={0}>
						<Grid item sm={6} xs={12}>
							<Typography variant="h6">Beers</Typography>
						</Grid>
						<Grid item sm={6} xs={12}>
							<Typography variant="body1">Score: {punkapiList.length}</Typography>
						</Grid>
					</Grid>
					<Paper className={classes.paper}>
						{punkapiList.length > 0 ? (
							punkapiList.map(punkapi => {
								return (
									<MyFavoritesDetails
										key={punkapi.id}
										id={punkapi.id}
										name={punkapi.name}
										module="punkapi"
										image_url={punkapi.image_url}
									/>
								);
							})
						) : (
							<Typography variant="body1">No beers liked yet</Typography>
						)}
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(withRouter(MyFavorites));

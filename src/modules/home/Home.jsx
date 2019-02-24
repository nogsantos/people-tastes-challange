import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';

import { Image } from './Style';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	container: {
		height: 'auto',
		paddingTop: 35
	},
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary,
		position: 'relative',
		height: '25rem',
		width: '30rem',
		textAlign: 'center',
		'& > p': {
			position: 'absolute',
			width: '95%',
			bottom: '10px',
			backgroundColor: '#ffffff'
		}
	}
});
class Home extends Component {
	goTo = link => {
		this.props.history.push(`/${link}`);
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<Typography variant="h4">Say me which one do you prefer, choose a category</Typography>
					<Grid
						container
						spacing={16}
						className={classes.container}
						alignItems="center"
						direction="row"
						justify="center"
					>
						<Grid item>
							<CardActionArea onClick={() => this.goTo('swapi')}>
								<Paper className={classes.paper}>
									<Image
										image="https://res.cloudinary.com/nogsantos/image/upload/v1551031396/people-tastes/Star-Wars.jpg"
										title="Star Wars"
									/>
									<Typography variant="body1">Star Wars Movie</Typography>
								</Paper>
							</CardActionArea>
						</Grid>
						<Grid item>
							<CardActionArea onClick={() => this.goTo('punkapi')}>
								<Paper className={classes.paper}>
									<Image
										image="https://res.cloudinary.com/nogsantos/image/upload/v1551029618/people-tastes/original-beer.jpg"
										title="Beers"
									/>
									<Typography variant="body1">Beers</Typography>
								</Paper>
							</CardActionArea>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

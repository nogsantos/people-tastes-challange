import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

import Img from 'react-image';

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
		height: '20rem',
		width: '30rem',
		textAlign: 'center',
		'& > p': {
			position: 'absolute',
			width: '95%',
			bottom: '10px',
			backgroundColor: '#ffffff'
		}
	},
	progress: {
		margin: theme.spacing.unit * 2
	},
	img: {
		position: 'relative',
		width: '100%',
		height: 'auto'
	},
	boxTitle: {
		position: 'absolute',
		width: '100%',
		bottom: '15px'
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
					<Typography variant="h3">Say me which one do you prefer, choose a category</Typography>
					<Divider variant="fullWidth" />
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
									<Img
										className={classes.img}
										src={'https://res.cloudinary.com/nogsantos/image/upload/v1551031396/people-tastes/Star-Wars.jpg'}
										loader={<CircularProgress className={classes.progress} />}
									/>
									<Typography variant="h4" className={classes.boxTitle}>
										Star Wars Movie
									</Typography>
								</Paper>
							</CardActionArea>
						</Grid>
						<Grid item>
							<CardActionArea onClick={() => this.goTo('punkapi')}>
								<Paper className={classes.paper}>
									<Img
										className={classes.img}
										src={
											'https://res.cloudinary.com/nogsantos/image/upload/v1551029618/people-tastes/original-beer.jpg'
										}
										loader={<CircularProgress className={classes.progress} />}
									/>
									<Typography variant="h4" className={classes.boxTitle}>
										Beers
									</Typography>
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

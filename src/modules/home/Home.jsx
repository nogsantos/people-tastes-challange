import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

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
		height: '25rem',
		width: '30rem'
	}
});
class Home extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<Typography variant="h4">Selecione qual você prefere</Typography>
					<Grid
						container
						spacing={40}
						className={classes.container}
						alignItems="center"
						direction="row"
						justify="center"
					>
						<Grid item>
							<Paper className={classes.paper}>
								<Link to="/swapi">Swapi</Link>
							</Paper>
						</Grid>
						<Grid item>
							<Paper className={classes.paper}>
								<Link to="/punkapi">Punkapi</Link>
							</Paper>
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

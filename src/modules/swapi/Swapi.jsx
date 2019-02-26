import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Swapi extends Component {
	render() {
		return (
			<Fragment>
				<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={24}>
					<Grid item sm={12} xs={12}>
						<Typography variant="h3">SWAPI</Typography>
						<Divider variant="fullWidth" />
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default Swapi;

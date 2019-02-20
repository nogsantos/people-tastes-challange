import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Swapi extends Component {
	render() {
		return (
			<Fragment>
				<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={24}>
					<Grid item sm={12} xs={12}>
						<Typography variant="h2">SWAPI</Typography>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

export default Swapi;

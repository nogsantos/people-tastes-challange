import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

/**
 * Stateless details render form Films category
 */
export const Films = props => {
	return (
		<Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16}>
			<Grid item sm={4}>
				{props.children.opening_crawl && <Typography variant="body1">{props.children.opening_crawl}</Typography>}
			</Grid>
			<Grid item sm={8}>
				<List dense={true}>
					{props.children.director && (
						<Fragment>
							<ListItem>
								<ListItemText primary="Director" secondary={props.children.director} />
							</ListItem>
							<Divider component="li" />
						</Fragment>
					)}
					{props.children.producer && (
						<Fragment>
							<ListItem>
								<ListItemText primary="Producer" secondary={props.children.producer} />
							</ListItem>
							<Divider component="li" />
						</Fragment>
					)}
					{props.children.episode_id && (
						<Fragment>
							<ListItem>
								<ListItemText primary="Episode id" secondary={props.children.episode_id} />
							</ListItem>
							<Divider component="li" />
						</Fragment>
					)}
					{props.children.release_date && (
						<Fragment>
							<ListItem>
								<ListItemText primary="Release date" secondary={props.children.release_date} />
							</ListItem>
						</Fragment>
					)}
				</List>
			</Grid>
		</Grid>
	);
};

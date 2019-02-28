import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/**
 * Stateless details render form Species category
 */
export const Species = props => {
	return (
		<List dense={true}>
			{props.children.classification && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Classification" secondary={props.children.classification} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.designation && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Designation" secondary={props.children.designation} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.language && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Language" secondary={props.children.language} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.skin_colors && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Skin colors" secondary={props.children.skin_colors} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.eye_colors && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Eye colors" secondary={props.children.eye_colors} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.hair_colors && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Hair colors" secondary={props.children.hair_colors} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.average_height && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Average height" secondary={props.children.average_height} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.average_lifespan && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Average lifespan" secondary={props.children.average_lifespan} />
					</ListItem>
				</Fragment>
			)}
		</List>
	);
};

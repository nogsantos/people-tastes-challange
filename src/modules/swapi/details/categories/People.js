import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/**
 * Stateless details render form people category
 */
export const People = props => {
	return (
		<List dense={true}>
			{props.children.gender && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Gender" secondary={props.children.gender} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.birth_year && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Birth year" secondary={props.children.birth_year} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.eye_color && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Eye color" secondary={props.children.eye_color} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.hair_color && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Hair color" secondary={props.children.hair_color} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.skin_color && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Skin color" secondary={props.children.skin_color} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.height && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Height" secondary={props.children.height} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.mass && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Mass" secondary={props.children.mass} />
					</ListItem>
				</Fragment>
			)}
		</List>
	);
};

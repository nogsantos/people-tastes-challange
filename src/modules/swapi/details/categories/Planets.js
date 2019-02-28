import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/**
 * Stateless details render form Planets category
 */
export const Planets = props => {
	return (
		<List dense={true}>
			{props.children.terrain && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Terrain" secondary={props.children.terrain} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.climate && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Climate" secondary={props.children.climate} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.gravity && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Gravity" secondary={props.children.gravity} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.diameter && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Diameter" secondary={props.children.diameter} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.population && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Population" secondary={props.children.population} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.orbital_period && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Orbital period" secondary={props.children.orbital_period} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.rotation_period && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Rotation period" secondary={props.children.rotation_period} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.surface_water && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Surface water" secondary={props.children.surface_water} />
					</ListItem>
				</Fragment>
			)}
		</List>
	);
};

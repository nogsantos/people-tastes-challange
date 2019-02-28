import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/**
 * Stateless details render form Starships category
 */
export const StarShips = props => {
	return (
		<List dense={true}>
			{props.children.model && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Model" secondary={props.children.model} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.manufacturer && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Manufacturer" secondary={props.children.manufacturer} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.starship_class && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Class" secondary={props.children.starship_class} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.cargo_capacity && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Cargo capacity" secondary={props.children.cargo_capacity} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.consumables && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Consumables" secondary={props.children.consumables} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.cost_in_credits && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Cost in credits" secondary={props.children.cost_in_credits} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.MGLT && (
				<Fragment>
					<ListItem>
						<ListItemText primary="MGLT" secondary={props.children.MGLT} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.crew && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Crew" secondary={props.children.crew} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.hyperdrive_rating && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Hyperdrive rating" secondary={props.children.hyperdrive_rating} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.length && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Length" secondary={props.children.length} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.max_atmosphering_speed && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Max atmosphering speed" secondary={props.children.max_atmosphering_speed} />
					</ListItem>
					<Divider component="li" />
				</Fragment>
			)}
			{props.children.passengers && (
				<Fragment>
					<ListItem>
						<ListItemText primary="Passengers" secondary={props.children.passengers} />
					</ListItem>
				</Fragment>
			)}
		</List>
	);
};

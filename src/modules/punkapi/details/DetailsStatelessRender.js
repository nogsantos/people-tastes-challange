import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

/**
 * Stateless details render
 */
export const DetailsStatelessRender = props => {
	return (
		<Paper elevation={1}>
			<List dense={true}>
				{props.agline && (
					<Fragment>
						<ListItem>
							<ListItemText primary="AG Line" secondary={props.agline} />
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.first_brewed && (
					<Fragment>
						<ListItem>
							<ListItemText primary="First brewed" secondary={props.first_brewed} />
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.bv && props.bu && (
					<Fragment>
						<ListItem>
							{props.abv && <ListItemText primary="ABV" secondary={props.abv} />}
							{props.ibu && <ListItemText primary="IBU" secondary={props.ibu} />}
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.target_fg && props.target_og && (
					<Fragment>
						<ListItem>
							{props.target_fg && <ListItemText primary="Target FG" secondary={props.target_fg} />}
							{props.target_og && <ListItemText primary="Target OG" secondary={props.target_og} />}
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.ebc && props.srm && (
					<Fragment>
						<ListItem>
							{props.ebc && <ListItemText primary="EBC" secondary={props.ebc} />}
							{props.srm && <ListItemText primary="SRM" secondary={props.srm} />}
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.ph && props.attenuation_level && (
					<Fragment>
						<ListItem>
							{props.ph && <ListItemText primary="PH" secondary={props.ph} />}
							{props.attenuation_level && (
								<ListItemText primary="Attenuation Level" secondary={props.attenuation_level} />
							)}
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.volume && (
					<Fragment>
						<ListItem>
							{props.volume.value && <ListItemText primary="Volume Value" secondary={props.volume.value} />}
							{props.volume.unit && <ListItemText primary="Volume Unit" secondary={props.volume.unit} />}
						</ListItem>
						<Divider component="li" />
					</Fragment>
				)}
				{props.boil_volume && (
					<ListItem>
						{props.boil_volume.value && <ListItemText primary="Boil vol. Value" secondary={props.boil_volume.value} />}
						{props.boil_volume.unit && <ListItemText primary="Boil vol. Unit" secondary={props.boil_volume.unit} />}
					</ListItem>
				)}
			</List>
		</Paper>
	);
};

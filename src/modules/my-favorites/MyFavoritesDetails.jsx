import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withRouter } from 'react-router';
import teal from '@material-ui/core/colors/teal';
import Divider from '@material-ui/core/Divider';

import { CategoryIconsService } from '../../services/';

const styles = theme => ({
	icon: {
		margin: theme.spacing.unit * 2,
		color: teal[800]
	}
});
class MyFavorites extends Component {
	goToDetailsView = () => {
		this.props.history.push(`/${this.props.module}/details/${this.props.id}`);
	};

	render() {
		const { classes } = this.props;
		return (
			<List dense={false}>
				<ListItem key={this.props.id} button onClick={this.goToDetailsView}>
					<FavoriteIcon className={classes.icon} />
					{this.props.showSecondaryText ? (
						<ListItemText primary={this.props.name} secondary={this.props.secondary} />
					) : (
						<ListItemText primary={this.props.name} />
					)}
					{this.props.category && (
						<ListItemAvatar>
							<CategoryIconsService category={this.props.category} />
						</ListItemAvatar>
					)}
					{this.props.image_url && (
						<ListItemAvatar>
							<Avatar alt={this.props.name} src={this.props.image_url} />
						</ListItemAvatar>
					)}
				</ListItem>
				<Divider component="li" />
			</List>
		);
	}
}

MyFavorites.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	name: PropTypes.string.isRequired,
	module: PropTypes.string.isRequired,
	showSecondaryText: PropTypes.bool,
	image_url: PropTypes.string,
	category: PropTypes.string,
	secondary: PropTypes.string
};

export default withStyles(styles)(withRouter(MyFavorites));

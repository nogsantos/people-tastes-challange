import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublicIcon from '@material-ui/icons/Public';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

import { AppContext } from '../../providers/app-context';
import AppDialog from '../dialog/';

import { StyledToolBar } from './MenuStyle';

const emails = ['nogsantos@gmail.com'];
const styles = theme => ({
	toolbar: {
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	}
});

class Menu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			selectedValue: emails[1]
		};
	}

	handleClickOpen = () => {
		this.setState({
			open: true
		});
	};

	handleGoTo = link => {
		if (link) {
			this.props.history.push(`${link}`);
		}
	};

	handleClose = value => {
		this.setState({ selectedValue: value, open: false });
	};

	menuAction = () => {
		const { handleDrawerClose } = this.props;
		handleDrawerClose();
	};

	render() {
		const { classes, theme } = this.props;
		return (
			<AppContext.Consumer>
				{({ handleDrawerClose }) => (
					<Fragment>
						<StyledToolBar className={classes.toolbar}>
							<Typography variant="subtitle1" gutterBottom>
								by Fabricio Nogueira
							</Typography>
							<IconButton onClick={this.menuAction}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</StyledToolBar>
						<Divider />
						<List>
							<ListItem button key="home" onClick={() => this.handleGoTo('/')}>
								<ListItemIcon>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Home" />
							</ListItem>
							<ListItem button key="favorite" onClick={() => this.handleGoTo('/my-favorites')}>
								<ListItemIcon>
									<FavoriteIcon />
								</ListItemIcon>
								<ListItemText primary="My Favorites" />
							</ListItem>
							<ListItem button key="developer" onClick={this.handleClickOpen}>
								<ListItemIcon>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Send me a message" />
							</ListItem>
							<ListItem button key="portfolio" component="a" href="https://fabricionogueira.me">
								<ListItemIcon>
									<PublicIcon />
								</ListItemIcon>
								<ListItemText primary="My Portfolio" />
							</ListItem>
						</List>
						<AppDialog selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} />
					</Fragment>
				)}
			</AppContext.Consumer>
		);
	}
}
export default withStyles(styles, { withTheme: true })(withRouter(Menu));

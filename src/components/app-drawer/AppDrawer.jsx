import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 240;

const styles = theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1
		}
	}
});

class AppDrawer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.open !== prevState.open) {
			return { open: nextProps.open };
		} else return null;
	}

	render() {
		const { classes } = this.props;
		return (
			<Drawer
				variant="permanent"
				className={classNames(classes.drawer, {
					[classes.drawerOpen]: this.state.open,
					[classes.drawerClose]: !this.state.open
				})}
				classes={{
					paper: classNames({
						[classes.drawerOpen]: this.state.open,
						[classes.drawerClose]: !this.state.open
					})
				}}
				open={this.state.open}
			>
				{this.props.children}
			</Drawer>
		);
	}
}
export default withStyles(styles, { withTheme: true })(AppDrawer);

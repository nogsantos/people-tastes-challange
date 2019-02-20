import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import teal from '@material-ui/core/colors/teal';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

import { AppContext } from './providers/app-context';
import { Bar, AppDrawer, Menu, AppSnackBar } from './components/';
import { Main } from './modules/';
import { Root, Content, MainContent } from './AppStyle';

const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: {
			main: '#2979ff'
		}
	},
	typography: {
		useNextVariants: true
	}
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { handleDrawerClose, handleDrawerOpen } = this;
		const value = {
			...this.state,
			handleDrawerClose,
			handleDrawerOpen
		};
		return (
			<AppContext.Provider value={value}>
				<MuiThemeProvider theme={theme}>
					<Root>
						<Content>
							<CssBaseline />
							<Bar {...{ handleDrawerOpen }} />
							<AppDrawer open={this.state.open}>
								<Menu {...{ handleDrawerClose }} />
							</AppDrawer>
							<MainContent>
								<Main />
							</MainContent>
						</Content>
					</Root>
					<AppSnackBar />
				</MuiThemeProvider>
			</AppContext.Provider>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles({ withTheme: true })(App);

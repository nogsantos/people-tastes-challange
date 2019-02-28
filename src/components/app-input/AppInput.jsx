import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		marginBottom: 8
	},
	textField: {
		flexBasis: '100%'
	}
});

class AppInput extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<TextField
					data-testid="input-component"
					className={classNames(classes.margin, classes.textField)}
					id={this.props.id}
					variant="outlined"
					fullWidth
					label={this.props.label}
					value={this.props.value}
					onChange={this.props.onChange}
					InputProps={
						this.props.isTypeSearch && {
							startAdornment: (
								<InputAdornment data-testid="input-search-icon" position="start">
									<SearchIcon />
								</InputAdornment>
							)
						}
					}
				/>
			</div>
		);
	}
}

AppInput.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(AppInput);

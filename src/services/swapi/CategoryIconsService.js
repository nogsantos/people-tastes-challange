import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PeopleIcon from '@material-ui/icons/Face';
import PlanetsIcon from '@material-ui/icons/Public';
import FilmsIcon from '@material-ui/icons/LocalMovies';
import SpeciesIcon from '@material-ui/icons/Android';
import VehicleIcon from '@material-ui/icons/Motorcycle';
import StarshipsIcon from '@material-ui/icons/AirplanemodeActive';
import StarIcon from '@material-ui/icons/Star';

/**
 * Default category icons
 */
class CategoryIconsService extends Component {
	render() {
		let component = '';
		switch (this.props.category) {
			case 'people':
				component = <PeopleIcon style={{ fontSize: 40 }} />;
				break;
			case 'planets':
				component = <PlanetsIcon style={{ fontSize: 40 }} />;
				break;
			case 'films':
				component = <FilmsIcon style={{ fontSize: 40 }} />;
				break;
			case 'species':
				component = <SpeciesIcon style={{ fontSize: 40 }} />;
				break;
			case 'vehicles':
				component = <VehicleIcon style={{ fontSize: 40 }} />;
				break;
			case 'starships':
				component = <StarshipsIcon style={{ fontSize: 40 }} />;
				break;
			default:
				component = <StarIcon style={{ fontSize: 40 }} />;
				break;
		}
		return component;
	}
}

CategoryIconsService.propTypes = {
	category: PropTypes.string.isRequired
};

export default CategoryIconsService;

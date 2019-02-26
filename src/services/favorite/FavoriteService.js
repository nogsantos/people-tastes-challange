import LocalDb from '../../providers/local-db';

/**
 * Work with favorited actions
 */
class FavoriteService {
	constructor(database) {
		this.database = database;
	}

	getAllFavorites = () => {
		return LocalDb[this.database].toArray();
	};

	getFavoriteById = id => {
		return LocalDb[this.database].get(id).then(result => result);
	};

	removeFromFavorites = (id, callback) => {
		LocalDb[this.database].delete(id).then(response => callback());
	};

	addToFavorites = (object, callback) => {
		LocalDb[this.database].add({ ...object }).then(reposnse => callback());
	};
}

export default FavoriteService;

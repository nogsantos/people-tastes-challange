import LocalDb from '../../providers/local-db';

/**
 * Work with favorited actions
 */
class FavoriteService {
	constructor(database) {
		this.database = database;
	}

	getAllFavorites = () => {
		if (this.database) {
			return LocalDb[this.database].toArray();
		}
	};

	getFavoriteById = id => {
		if (this.database) {
			return LocalDb[this.database].get(id).then(result => result);
		}
	};

	removeFromFavorites = (id, callback) => {
		if (this.database && callback) {
			LocalDb[this.database].delete(id).then(response => callback());
		}
	};

	addToFavorites = (object, callback) => {
		if (this.database && callback) {
			LocalDb[this.database].add({ ...object }).then(reposnse => callback());
		}
	};
}

export default FavoriteService;

import Dexie from 'dexie';

const localDb = new Dexie('PeopleTastes');

localDb.version(1).stores({ swapi: '++id, name, image_url', punkapi: '++id, name, image_url' });

export default localDb;

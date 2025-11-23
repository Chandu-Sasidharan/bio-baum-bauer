import 'dotenv/config';

export const mongodb = {
  url: process.env.MONGODB_URI,
  databaseName: process.env.MONGO_DB_NAME,
};

export const migrationsDir = 'migrations';
export const changelogCollectionName = 'changelog';
export const migrationFileExtension = '.js';
export const useFileHash = false;
export const moduleSystem = 'esm';

export default {
  mongodb,
  migrationsDir,
  changelogCollectionName,
  migrationFileExtension,
  useFileHash,
  moduleSystem,
};

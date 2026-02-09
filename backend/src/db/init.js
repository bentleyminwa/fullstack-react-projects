import mongoose from 'mongoose';

export function initDatabase() {
  const DATABASEURL = process.env.DATABASE_URL;
  mongoose.connection.on('open', () => {
    console.info('Successfully connected to the database: ', DATABASEURL);
  });

  const connection = mongoose.connect(DATABASEURL);

  return connection;
}

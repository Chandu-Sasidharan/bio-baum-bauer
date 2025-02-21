import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

const close = () => mongoose.connection.close();

export default { connect, close };

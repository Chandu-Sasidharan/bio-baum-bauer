import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI;

const connect = async () => {
  await mongoose.connect(dbUrl);
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB!');
};

const close = () => mongoose.connection.close();

export default { connect, close };

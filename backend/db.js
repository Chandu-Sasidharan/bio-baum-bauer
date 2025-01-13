import mongoose from 'mongoose';

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB!');
};

const close = () => mongoose.connection.close();

export default { connect, close };

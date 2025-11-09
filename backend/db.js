import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URI;

const connect = () => mongoose.connect(dbUrl);
const close = () => mongoose.connection.close();

export default { connect, close };

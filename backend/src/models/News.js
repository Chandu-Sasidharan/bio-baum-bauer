import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
  newsDateCreated: { type: Date, default: Date.now },
  newsWriter: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    id: { type: String, required: true },
  },
  newsTitle: { type: String, required: true },
  newsDescription: { type: String, required: true },
});

const News = model('news', newsSchema);
export default News;

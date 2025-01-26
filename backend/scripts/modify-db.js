import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tree from '#src/models/tree.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function modifyDb() {
  try {
    await mongoose.connect(uri);

    await Tree.updateMany(
      { image: { $exists: true } },
      { $rename: { image: 'imageUrl' } }
    );

    // eslint-disable-next-line no-console
    console.log(`Updated documents.`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating tree image field:', error);
  } finally {
    await mongoose.disconnect();
  }
}

modifyDb();

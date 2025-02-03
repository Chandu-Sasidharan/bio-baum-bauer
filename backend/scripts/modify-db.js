import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Faq from '#src/models/Faq.js';

dotenv.config();

const uri = process.env.MONGODB_URI;

async function modifyFaqDb() {
  try {
    await mongoose.connect(uri);

    await Faq.updateMany(
      { Question: { $exists: true } },
      { $rename: { Question: 'question', Answers: 'answer' } }
    );

    // eslint-disable-next-line no-console
    console.log(`Updated documents.`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating Faq fields:', error);
  } finally {
    await mongoose.disconnect();
  }
}

modifyFaqDb();

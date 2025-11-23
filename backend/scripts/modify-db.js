// This script is for development purposes only to modify the database.
import 'dotenv/config';
import mongoose from 'mongoose';
import Tree from '#src/models/tree.js';
import Faq from '#src/models/faq.js';
import Impression from '#src/models/impression.js';

const wrapLocalized = value => {
  if (value && typeof value === 'object' && ('en' in value || 'de' in value)) {
    return value;
  }

  if (typeof value === 'string') {
    return { en: value, de: value };
  }

  return { en: '', de: '' };
};

const migrateTrees = async () => {
  const trees = await Tree.find().lean();
  await Promise.all(
    trees.map(tree =>
      Tree.updateOne(
        { _id: tree._id },
        {
          $set: {
            name: wrapLocalized(tree.name),
            shortDescription: wrapLocalized(tree.shortDescription),
            description: wrapLocalized(tree.description),
          },
        }
      )
    )
  );
  console.log(`Migrated ${trees.length} trees`);
};

const migrateFaqs = async () => {
  const faqs = await Faq.find().lean();
  await Promise.all(
    faqs.map(faq =>
      Faq.updateOne(
        { _id: faq._id },
        {
          $set: {
            question: wrapLocalized(faq.question),
            answer: wrapLocalized(faq.answer),
          },
        }
      )
    )
  );
  console.log(`Migrated ${faqs.length} FAQs`);
};

const migrateImpressions = async () => {
  const impressions = await Impression.find().lean();
  await Promise.all(
    impressions.map(impression =>
      Impression.updateOne(
        { _id: impression._id },
        {
          $set: {
            title: wrapLocalized(impression.title),
          },
        }
      )
    )
  );
  console.log(`Migrated ${impressions.length} impressions`);
};

const run = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const dbName = process.env.MONGO_DB_NAME;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required to run the migration');
  }

  await mongoose.connect(mongoUri, { dbName });
  console.log('Connected to MongoDB');

  await migrateTrees();
  await migrateFaqs();
  await migrateImpressions();

  await mongoose.disconnect();
  console.log('Migration complete');
};

run().catch(error => {
  console.error('Migration failed', error);
  process.exitCode = 1;
});

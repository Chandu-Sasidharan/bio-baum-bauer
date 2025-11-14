import { model, Schema } from 'mongoose';
import validateTree from '#src/validations/tree-validation.js';

const treeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Fruit Tree',
        'Nut Tree',
        'Flowering Tree',
        'Berry Shrubs',
        'Deciduous Forest',
        'Evergreen Forest',
      ],
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      trim: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: { type: String, trim: true },
    imageKey: { type: String, trim: true },
    imageBucket: { type: String, trim: true },
    imageFilename: { type: String, trim: true },
    imageMimeType: { type: String, trim: true },
    imageFilesize: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ['Available', 'Sold Out', 'Backorder'],
      default: 'Available',
    },
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tree = model('Tree', treeSchema);
Object.assign(Tree, {
  validateTree,
});

export default Tree;

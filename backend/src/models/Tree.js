import { model, Schema } from 'mongoose';

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
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
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
export default Tree;

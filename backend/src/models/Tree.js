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
      enum: ['Fruit', 'Evergreen', 'Deciduous'], // have to update it later
    },
    price: {
      type: Schema.Types.Decimal128, // for precise price representation
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0, // quantity should not be negative
    },
    description: {
      type: String,
      trim: true,
    },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ['Available', 'Sold Out', 'Backorder'],
      default: 'Available',
    },
    tags: [String],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Tree = model('Tree', treeSchema);
export default Tree;

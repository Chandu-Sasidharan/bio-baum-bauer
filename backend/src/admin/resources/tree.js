import Tree from '#src/models/tree.js';
import { createImageUploadFeature } from '#src/admin/features/image-upload/index.js';
import { createImageUrlHooks } from '#src/admin/hooks/image-url.js';
import {
  afterHookConvertPrice,
  beforeHookNormalizePrice,
} from '#src/admin/hooks/price.js';

const treeImageUploadFeature = createImageUploadFeature({ folder: 'trees' });
const { syncImageUrlAfterHook, restoreStoredImageUrl, restoreStoredImageUrls } =
  createImageUrlHooks({ model: Tree });

const treeActions = {
  list: {
    after: [restoreStoredImageUrls, afterHookConvertPrice],
  },
  show: {
    after: [restoreStoredImageUrl, afterHookConvertPrice],
  },
  edit: {
    before: beforeHookNormalizePrice,
    after: [syncImageUrlAfterHook, afterHookConvertPrice],
  },
  new: {
    before: beforeHookNormalizePrice,
    after: [syncImageUrlAfterHook, afterHookConvertPrice],
  },
};

const treeResource = {
  resource: Tree,
  options: {
    navigation: { name: 'Catalog', icon: 'Tree' },
    listProperties: [
      'name',
      'category',
      'price',
      'availableQuantity',
      'status',
      'isFeatured',
    ],
    editProperties: [
      'name',
      'category',
      'price',
      'availableQuantity',
      'shortDescription',
      'description',
      'imageFile',
      'status',
      'tags',
      'isFeatured',
    ],
    filterProperties: [
      'name',
      'category',
      'status',
      'isFeatured',
      'createdAt',
      'updatedAt',
    ],
    properties: {
      price: { type: 'number' },
      availableQuantity: { type: 'number' },
      tags: { isArray: true },
      description: { type: 'richtext' },
      shortDescription: { type: 'textarea' },
      imageUrl: {
        isVisible: { list: true, show: true, filter: false, edit: false },
      },
      imageFile: {
        isVisible: { list: false, show: false, filter: false, edit: true },
      },
      imageKey: {
        isVisible: { list: false, show: false, filter: false, edit: false },
      },
      imageBucket: {
        isVisible: { list: false, show: false, filter: false, edit: false },
      },
      imageFilename: {
        isVisible: { list: false, show: false, filter: false, edit: false },
      },
      imageMimeType: {
        isVisible: { list: false, show: false, filter: false, edit: false },
      },
    },
    actions: treeActions,
  },
  features: [treeImageUploadFeature],
  meta: {
    label: 'Trees',
    icon: 'Tree',
  },
};

export default treeResource;

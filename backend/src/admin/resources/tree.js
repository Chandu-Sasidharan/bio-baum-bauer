import Tree from '#src/models/tree.js';
import {
  afterHookConvertPrice,
  beforeHookNormalizePrice,
} from '#src/admin/hooks/price.js';
import {
  treeImageUploadFeature,
  syncImageUrlAfterHook,
  restoreStoredImageUrl,
  restoreStoredImageUrls,
} from '#src/admin/features/tree-image-upload/index.js';

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
        isVisible: {
          list: false,
          show: false,
          filter: false,
          edit: true,
        },
      },
      imageKey: {
        isVisible: {
          list: false,
          show: false,
          filter: false,
          edit: false,
        },
      },
      imageBucket: {
        isVisible: {
          list: false,
          show: false,
          filter: false,
          edit: false,
        },
      },
      imageFilename: {
        isVisible: {
          list: false,
          show: false,
          filter: false,
          edit: false,
        },
      },
      imageMimeType: {
        isVisible: {
          list: false,
          show: false,
          filter: false,
          edit: false,
        },
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

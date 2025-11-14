import Impression from '#src/models/impression.js';
import { createImageUploadFeature } from '#src/admin/features/image-upload/index.js';
import { createImageUrlHooks } from '#src/admin/hooks/image-url.js';

const impressionImageUploadFeature = createImageUploadFeature({
  folder: 'impressions',
});
const { syncImageUrlAfterHook, restoreStoredImageUrl, restoreStoredImageUrls } =
  createImageUrlHooks({ model: Impression });

const impressionResource = {
  resource: Impression,
  options: {
    navigation: { name: 'Content', icon: 'Star' },
    listProperties: ['title', 'imageUrl', 'createdAt'],
    editProperties: ['title', 'imageFile'],
    filterProperties: ['title', 'createdAt'],
    properties: {
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
      imageFilesize: {
        isVisible: { list: false, show: false, filter: false, edit: false },
      },
    },
    actions: {
      list: {
        after: [restoreStoredImageUrls],
      },
      show: {
        after: [restoreStoredImageUrl],
      },
      edit: {
        after: [syncImageUrlAfterHook],
      },
      new: {
        isAccessible: false,
        after: [syncImageUrlAfterHook],
      },
      delete: { isAccessible: false },
    },
  },
  features: [impressionImageUploadFeature],
  meta: {
    label: 'Impressions',
    icon: 'Star',
  },
};

export default impressionResource;

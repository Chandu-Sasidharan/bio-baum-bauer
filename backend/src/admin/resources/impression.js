import Impression from '#src/models/impression.js';

const impressionResource = {
  resource: Impression,
  options: {
    navigation: { name: 'Content', icon: 'Star' },
    actions: {
      new: { isAccessible: false },
      delete: { isAccessible: false },
    },
  },
  meta: {
    label: 'Impressions',
    icon: 'Star',
  },
};

export default impressionResource;

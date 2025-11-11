import Sponsorship from '#src/models/sponsorship.js';

const sponsorshipResource = {
  resource: Sponsorship,
  options: {
    navigation: { name: 'Content', icon: 'Gift' },
    actions: {
      new: { isAccessible: false },
      delete: { isAccessible: false },
    },
  },
  meta: {
    label: 'Sponsorships',
    icon: 'Gift',
  },
};

export default sponsorshipResource;

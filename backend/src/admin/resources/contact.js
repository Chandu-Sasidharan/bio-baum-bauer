import Contact from '#src/models/contact.js';

const contactResource = {
  resource: Contact,
  options: {
    navigation: { name: 'Content', icon: 'MessageSquare' },
    actions: {
      new: { isAccessible: false },
    },
  },
  meta: {
    label: 'Contacts',
    icon: 'MessageSquare',
  },
};

export default contactResource;

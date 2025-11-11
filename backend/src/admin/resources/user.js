import User from '#src/models/user.js';

const userResource = {
  resource: User,
  options: {
    navigation: { name: 'People', icon: 'User' },
    listProperties: ['firstName', 'lastName', 'email', 'isAdmin'],
    showProperties: [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'isAdmin',
      'isSuperAdmin',
      'isVerified',
      'createdAt',
      'updatedAt',
    ],
    actions: {
      new: { isAccessible: false },
      delete: { isAccessible: false },
      edit: {
        isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'super',
      },
    },
    properties: {
      password: { isVisible: false },
    },
  },
  meta: {
    label: 'Users',
    icon: 'User',
  },
};

export default userResource;

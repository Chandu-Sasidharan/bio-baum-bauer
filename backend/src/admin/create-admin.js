import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import Tree from '#src/models/tree.js';
import Faq from '#src/models/faq.js';
import User from '#src/models/user.js';
import Sponsorship from '#src/models/sponsorship.js';
import Impression from '#src/models/impression.js';
import Contact from '#src/models/contact.js';
import {
  afterHookConvertPrice,
  beforeHookNormalizePrice,
} from '#src/admin/price-hooks.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const createAdmin = () =>
  new AdminJS({
    rootPath: '/admin',
    branding: {
      companyName: 'Bio Baum Bauer Admin',
      softwareBrothers: false,
    },
    resources: [
      {
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
            'imageUrl',
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
          },
          actions: {
            list: { after: afterHookConvertPrice },
            show: { after: afterHookConvertPrice },
            edit: {
              before: beforeHookNormalizePrice,
              after: afterHookConvertPrice,
            },
            new: {
              before: beforeHookNormalizePrice,
              after: afterHookConvertPrice,
            },
          },
        },
      },
      {
        resource: Faq,
        options: {
          navigation: { name: 'Content', icon: 'HelpCircle' },
          listProperties: ['question', 'createdAt'],
          editProperties: ['question', 'answer'],
          filterProperties: ['question', 'createdAt'],
          properties: {
            answer: { type: 'richtext' },
          },
        },
      },
      {
        resource: Impression,
        options: {
          navigation: { name: 'Content', icon: 'Star' },
          actions: {
            new: { isAccessible: false },
            delete: { isAccessible: false },
          },
        },
      },
      {
        resource: Sponsorship,
        options: {
          navigation: { name: 'Content', icon: 'Gift' },
          actions: {
            new: { isAccessible: false },
            delete: { isAccessible: false },
          },
        },
      },
      {
        resource: Contact,
        options: {
          navigation: { name: 'Content', icon: 'MessageSquare' },
          actions: {
            new: { isAccessible: false },
            delete: { isAccessible: false },
          },
        },
      },
      {
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
              isAccessible: ({ currentAdmin }) =>
                currentAdmin?.role === 'super',
            },
          },
          properties: {
            password: { isVisible: false },
          },
        },
      },
    ],
  });

export default createAdmin;

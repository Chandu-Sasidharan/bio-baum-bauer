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
} from '#src/admin/utils/price-hooks.js';
import {
  componentLoader,
  DashboardComponent,
} from '#src/admin/component-loader.js';
import treeImageUpload from '#src/admin/utils/image-upload.js';
import {
  syncImageUrlAfterHook,
  restoreStoredImageUrl,
  restoreStoredImageUrls,
} from '#src/admin/utils/image-url-hooks.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const createAdmin = () =>
  new AdminJS({
    rootPath: '/admin',
    componentLoader,
    branding: {
      companyName: 'Bio Baum Bauer Console',
      logo: null,
      favicon: '/admin-assets/favicon.ico',
      softwareBrothers: false,
      theme: {
        colors: {
          primary100: '#5a6448',
          bgLogin: '#F5FFF2', // login page background
          textOnPrimary: '#FFFFFF',
        },
        fonts: {
          base: '"Inter", sans-serif',
        },
      },
    },
    assets: {
      styles: ['/admin-assets/css/login-overrides.css'],
    },
    locale: {
      language: 'en',
      translations: {
        en: {
          components: {
            Login: {
              welcomeHeader: 'Welcome.',
              welcomeMessage: 'Enter your admin credentials to continue',
              loginButton: 'Sign in',
            },
          },
          messages: {
            invalidCredentials: 'That email/password pair was not found',
          },
        },
      },
    },

    dashboard: {
      component: DashboardComponent,
      handler: async () => {
        const resources = [
          { label: 'Trees', resource: Tree, icon: 'Tree' },
          { label: 'FAQs', resource: Faq, icon: 'HelpCircle' },
          { label: 'Impressions', resource: Impression, icon: 'Star' },
          { label: 'Sponsorships', resource: Sponsorship, icon: 'Gift' },
          { label: 'Contacts', resource: Contact, icon: 'MessageSquare' },
          { label: 'Users', resource: User, icon: 'User' },
        ];

        const cards = await Promise.all(
          resources.map(async ({ label, resource, icon }) => ({
            label,
            icon,
            resourceId: resource.modelName, // used to build links on the client
            count: await resource.countDocuments(),
          }))
        );

        return { cards };
      },
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
          actions: {
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
          },
        },
        features: [treeImageUpload],
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

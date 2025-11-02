import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import bcrypt from 'bcryptjs';
import Admin from '#src/models/admin.js';
import Tree from '#src/models/tree.js';
import Faq from '#src/models/faq.js';
import User from '#src/models/user.js';
import Sponsorship from '#src/models/sponsorship.js';
import Impression from '#src/models/impression.js';
import Contact from '#src/models/contact.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const normalizeDecimalPrice = record => {
  const params = record?.params ?? {};
  const priceParam = params.price ?? params['price.$numberDecimal'];
  if (!priceParam) return record;

  if (typeof priceParam === 'object' && '$numberDecimal' in priceParam) {
    const val = priceParam.$numberDecimal;
    record.params.price = val;
    record.params['price.$numberDecimal'] = val;
    return record;
  }

  if (typeof priceParam === 'string') {
    record.params.price = priceParam;
    record.params['price.$numberDecimal'] = priceParam;
  }

  return record;
};

const afterHookConvertPrice = async response => {
  if (response.record) {
    response.record = normalizeDecimalPrice(response.record);
  }

  if (response.records) {
    response.records = response.records.map(normalizeDecimalPrice);
  }

  return response;
};

const beforeHookNormalizePrice = async request => {
  const price = request.payload?.price;
  if (price !== undefined && price !== null && price !== '') {
    return {
      ...request,
      payload: { ...request.payload, price: price.toString() },
    };
  }

  return request;
};

const admin = new AdminJS({
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
            isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'super',
          },
        },
        properties: {
          password: { isVisible: false },
        },
      },
    },
  ],
});

const buildAdminRouter = () => {
  const cookieSecret =
    process.env.ADMIN_JWT_SECRET_KEY || process.env.JWT_SECRET_KEY || 'admin';

  return AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        const adminUser = await Admin.findOne({ email }).lean();
        if (!adminUser) return null;

        const isPasswordValid = await bcrypt.compare(
          password,
          adminUser.password
        );

        if (!isPasswordValid) return null;

        return {
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.isSuperAdmin ? 'super' : 'admin',
        };
      },
      cookieName: 'bbb-admin',
      cookiePassword: cookieSecret,
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: cookieSecret,
    }
  );
};

export { admin, buildAdminRouter };

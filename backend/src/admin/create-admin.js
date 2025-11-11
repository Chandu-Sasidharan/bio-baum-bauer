import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import {
  componentLoader,
  DashboardComponent,
} from '#src/admin/component-loader.js';
import adminResources from '#src/admin/resources/index.js';

const dashboardResources = adminResources.map(({ resource, meta = {} }) => ({
  label: meta.label ?? resource.modelName,
  icon: meta.icon,
  resource,
}));

const resourceConfigs = adminResources.map(
  ({ meta: _meta, ...config }) => config
);

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
      withMadeWithLove: false,
      logo: null,
      favicon: '/admin-assets/favicon.ico',
      softwareBrothers: false,
      theme: {
        colors: {
          primary100: '#5a6448',
          bgLogin: '#F5FFF2',
          textOnPrimary: '#FFFFFF',
        },
        fonts: {
          base: '"Inter", sans-serif',
        },
      },
    },
    assets: {
      styles: ['/admin-assets/css/admin-overrides.css'],
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
        const cards = await Promise.all(
          dashboardResources.map(async ({ label, resource, icon }) => ({
            label,
            icon,
            resourceId: resource.modelName,
            count: await resource.countDocuments(),
          }))
        );

        return { cards };
      },
    },
    resources: resourceConfigs,
  });

export default createAdmin;

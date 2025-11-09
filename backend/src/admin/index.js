import createAdmin from '#src/admin/create-admin.js';
import buildAdminRouterFactory from '#src/admin/build-admin-router.js';

const admin = createAdmin();
if (process.env.NODE_ENV !== 'production') {
  admin.watch();
}

const buildAdminRouter = () => buildAdminRouterFactory(admin);

export { admin, buildAdminRouter };

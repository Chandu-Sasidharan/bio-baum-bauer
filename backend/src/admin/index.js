import createAdmin from '#src/admin/create-admin.js';
import buildAdminRouterFactory from '#src/admin/build-admin-router.js';

const admin = createAdmin();
const buildAdminRouter = () => buildAdminRouterFactory(admin);

export { admin, buildAdminRouter };

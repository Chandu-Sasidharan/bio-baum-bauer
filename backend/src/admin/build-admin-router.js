import AdminJSExpress from '@adminjs/express';
import bcrypt from 'bcryptjs';
import Admin from '#src/models/admin.js';

const buildAdminRouter = admin => {
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

export default buildAdminRouter;

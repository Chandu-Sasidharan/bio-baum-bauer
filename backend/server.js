import app from '#root/app.js';
import db from '#root/db.js';
import { admin, buildAdminRouter } from '#src/admin/index.js';

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await db.connect();

    // Mount AdminJS routes
    app.use(admin.options.rootPath, buildAdminRouter());

    // Start Express server
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

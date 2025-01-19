import app from '#root/app.js';
import db from '#root/db.js';

// Start server
const port = process.env.PORT || 4000;
app.listen(port, async () => {
  try {
    await db.connect();
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
});

import app from '#root/app.js';
import db from '#root/db.js';

const port = process.env.PORT || 4000;

// Start server
app.listen(port, async () => {
  await db.connect();
});

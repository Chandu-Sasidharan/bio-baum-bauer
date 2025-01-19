import bcrypt from 'bcryptjs';
import 'dotenv/config';

export async function up(db) {
  const salt = await bcrypt.genSalt(10);
  const superPassword = await bcrypt.hash(process.env.SUPER_PASSWORD, salt);
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

  await db.collection('admins').insertMany([
    {
      name: 'Super Admin!',
      email: 'sa@biobaumbauer.de',
      password: superPassword,
      isSuperAdmin: true,
    },
    {
      name: 'Admin',
      email: 'admin@biobaumbauer.de',
      password: adminPassword,
      isAdmin: true,
    },
  ]);
}

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Basic seed script.
 *
 * - Ensures there is at least one admin user in the database.
 * - Can be safely re-run (it is idempotent based on email).
 *
 * You can change the default credentials via environment variables:
 *   SEED_ADMIN_EMAIL
 *   SEED_ADMIN_PASSWORD
 */
async function main() {
  const adminEmail =
    process.env.SEED_ADMIN_EMAIL || 'admin@sportspot.local';
  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD || 'admin123';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`Seed: admin user ${adminEmail} already exists, skipping.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: 'SportSpot Admin',
      gender: 'MALE',
      role: 'ADMIN',
      city: 'Al Ain',
    },
  });

  console.log(
    `Seed: created initial admin user with email=${adminEmail} and password=${adminPassword}`,
  );
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

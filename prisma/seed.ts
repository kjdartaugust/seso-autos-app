import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { demoVehicles, demoRentals } from "../src/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@sesoautos.com";
  const password = process.env.ADMIN_PASSWORD || "seso-admin-2026";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed, name: "SESO Admin", role: "admin" },
  });
  console.log(`✔ Admin user ready: ${email}`);

  for (const v of demoVehicles) {
    await prisma.vehicle.upsert({
      where: { id: v.id },
      update: {},
      create: {
        id: v.id,
        title: v.title,
        make: v.make,
        model: v.model,
        year: v.year,
        price: v.price,
        mileage: v.mileage,
        fuelType: v.fuelType,
        transmission: v.transmission,
        bodyType: v.bodyType,
        color: v.color,
        engine: v.engine,
        description: v.description,
        images: JSON.stringify(v.images),
        importSource: v.importSource,
        status: v.status,
        featured: v.featured,
      },
    });
  }
  console.log(`✔ Seeded ${demoVehicles.length} vehicles`);

  for (const r of demoRentals) {
    await prisma.rentalVehicle.upsert({
      where: { id: r.id },
      update: {},
      create: {
        id: r.id,
        name: r.name,
        category: r.category,
        seats: r.seats,
        transmission: r.transmission,
        image: r.image,
        dailyRate: r.dailyRate,
        weeklyRate: r.weeklyRate,
        monthlyRate: r.monthlyRate,
        available: r.available,
      },
    });
  }
  console.log(`✔ Seeded ${demoRentals.length} rental vehicles`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

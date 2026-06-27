import { prisma } from "@/lib/prisma";
import { handleSubmission, str } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(
    req,
    ["name", "phone", "email", "category", "startDate", "endDate"],
    (d) =>
      prisma.rentalBooking.create({
        data: {
          name: str(d.name),
          email: str(d.email),
          phone: str(d.phone),
          category: str(d.category),
          rentalVehicleId: d.rentalVehicleId ? str(d.rentalVehicleId) : null,
          startDate: new Date(str(d.startDate)),
          endDate: new Date(str(d.endDate)),
          pricingPlan: str(d.pricingPlan) || "Daily",
          delivery: Boolean(d.delivery),
          deliveryAddress: d.deliveryAddress ? str(d.deliveryAddress) : null,
          notes: str(d.notes),
        },
      })
  );
}

import { prisma } from "@/lib/prisma";
import { handleSubmission, str } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(
    req,
    ["name", "phone", "email", "serviceType"],
    (d) =>
      prisma.licensingRequest.create({
        data: {
          name: str(d.name),
          email: str(d.email),
          phone: str(d.phone),
          serviceType: str(d.serviceType),
          vehicleInfo: d.vehicleInfo ? str(d.vehicleInfo) : null,
          message: str(d.message),
        },
      })
  );
}

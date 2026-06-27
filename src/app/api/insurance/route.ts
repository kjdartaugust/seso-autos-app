import { prisma } from "@/lib/prisma";
import { handleSubmission, str } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(
    req,
    ["name", "phone", "email", "coverageType"],
    (d) =>
      prisma.insuranceInquiry.create({
        data: {
          name: str(d.name),
          email: str(d.email),
          phone: str(d.phone),
          coverageType: str(d.coverageType),
          vehicleValue: d.vehicleValue ? str(d.vehicleValue) : null,
          vehicleDetail: d.vehicleDetail ? str(d.vehicleDetail) : null,
          message: str(d.message),
        },
      })
  );
}

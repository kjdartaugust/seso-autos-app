import { prisma } from "@/lib/prisma";
import { handleSubmission, str } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(req, ["name", "phone", "email", "plan"], (d) =>
    prisma.trackingInquiry.create({
      data: {
        name: str(d.name),
        email: str(d.email),
        phone: str(d.phone),
        plan: str(d.plan),
        fleetSize: d.fleetSize ? str(d.fleetSize) : null,
        message: str(d.message),
      },
    })
  );
}

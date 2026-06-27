import { prisma } from "@/lib/prisma";
import { handleSubmission, str } from "@/lib/submit";

export async function POST(req: Request) {
  return handleSubmission(req, ["name", "phone", "email", "message"], (d) =>
    prisma.salesInquiry.create({
      data: {
        name: str(d.name),
        email: str(d.email),
        phone: str(d.phone),
        message: str(d.message),
      },
    })
  );
}

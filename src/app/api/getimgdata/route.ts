import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";

export async function POST(request: NextRequest) {
  try {
    if (request.method == "POST") {
        const body = await request.json();
        const { id } = body;
        const data = await models.info_image.findOne({ where: { img_ID: id } }) as any;
        return NextResponse.json({ message: "Success", status: 200, data });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

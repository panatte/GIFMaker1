import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    if (request.method == "POST") {
      const body = await request.json();
      const { url } = body;
      const id = url.split("?id=")[1];
      const token = request.cookies.get("token")?.value as any;
      if (!token) {
        return NextResponse.json({ message: "Token not found", status: 401 });
      }
      const decoded = jwt.verify(token, "secret") as any;

      if (!decoded) {
        return NextResponse.json({ message: "Token is invalid", status: 401 });
      }

      const deleteImg = await models.info_image.destroy({
        where: {
          img_ID: id,
        },
      });

      if (deleteImg) {
        return NextResponse.json({
          istrue: true,
          message: "Success",
          status: 200,
        });
      } else {
        return NextResponse.json({
          istrue: false,
          message: "Failed",
          status: 500,
        });
      }
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

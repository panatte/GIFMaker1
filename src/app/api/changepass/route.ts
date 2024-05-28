import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    if (request.method == "POST") {
      const body = await request.json();
      const { newpassword } = body;
      const token = request.cookies.get("token")?.value as any;
      if (!token) {
        return NextResponse.json({ message: "Token not found", status: 401 });
      }
      const decoded = jwt.verify(token, "secret") as any;

      if (!decoded) {
        return NextResponse.json({ message: "Token is invalid", status: 401 });
      }

      const user = await models.User.findOne({
        where: { userID: decoded.UserID },
      });
      if (!user) {
        return NextResponse.json({ message: "User not found", status: 404 });
      }
      await user.update(
        { Password: newpassword },
        { where: { userID: decoded.UserID } }
      );
      return NextResponse.json({ message: "Password Changed", status: 200 });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    if (request.method === "POST") {
      const cookieHeader = request.headers.get("cookie");

      if (!cookieHeader) {
        return NextResponse.json({ message: "Error: No cookie found", status: 500 });
      }
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map(cookie => cookie.split("="))
      );
      const token = cookies["token"]; // แทนที่ 'your-cookie-name' ด้วยชื่อของคุกกี้ที่เก็บ JWT
      if (!token) {
        return NextResponse.json({ message: "Error: Token not found", status: 500 });
      }
      try {
        const decoded = jwt.verify(token, "secret") as JwtPayload;
        return NextResponse.json({
          message: "Success",
          status: 200,
          data: {
            role: decoded.role,
            username: decoded.username,
            UserID: decoded.UserID,
            path_profile: decoded.pathProfile,
            name: decoded.name
          }
        });
      } catch (error) {
        return NextResponse.json({ message: "Error: Invalid token", status: 500 });
      }
    } else {
      return NextResponse.json({ message: "Error: Invalid method", status: 405 });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

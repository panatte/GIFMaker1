import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    if (request.method == "POST") {
        const body = await request.json();
        const { id } = body;
        const token = request.cookies.get("token")?.value as any;
        

        if (!token) {
          return NextResponse.json({like: false, message: "Token not found", status: 401 });
        }
        const decoded = jwt.verify(token, "secret") as any;
        
        if (!decoded) {
          return NextResponse.json({like: false, message: "Token is invalid", status: 401 });
        }
        
        const check_like_history = await models.like_history.findOne({ where: { img_id: id, username: decoded.username } }) as any;
        if (check_like_history) {
          return NextResponse.json({like: false, message: "Already liked", status: 401 });
        }

        await models.like_history.create({ img_id: id, username: decoded.username });

        const user_like = await models.like_history.count({ where: { img_id: id } }) as any;

        await models.info_image.update({ user_like }, { where: { img_ID: id } });

        return NextResponse.json({like: true, message: "Success", status: 200 });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({like: false, message: "Error", status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    if (request.method == "POST") {
        const token = request.cookies.get("token")?.value as any;   
        if (!token) {
          return NextResponse.json({message: "Token not found", status: 401 });
        }
        const decoded = jwt.verify(token, "secret") as any;
        
        if (!decoded) {
          return NextResponse.json({message: "Token is invalid", status: 401 });
        }
        const UserID = decoded.UserID;

        const data = await models.info_image.findAll({attributes:["path_Img","img_ID"],where: {UserID: UserID}, raw: true});
        console.log('image my user ------------------------------------------------ ',data);
        const datas = data.map((item: any) => item.path_Img+"?id="+item.img_ID);
        return NextResponse.json({
          istrue: true,
          message: "Success",
          status: 200,
          img_url: datas,
        });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({message: "Error", status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";
import models from "../../utils/models";

export async function GET(request: NextRequest) {
  try {
    if (request.method == "GET") {
      let data = await models.info_image.findAll({ raw: true}) as any;
      data.forEach((element:any) => {
        element.image = element.path_Img+"?id="+element.img_ID;
      });
      data = data.map((element:any) => element.image);
      
      return NextResponse.json({ message: "Success", status: 200, urls: data});
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}

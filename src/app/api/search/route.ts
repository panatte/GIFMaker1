import { NextResponse, NextRequest } from "next/server";
import { Op } from "sequelize";
import models from "@/app/utils/models";

export async function POST(request: NextRequest) {
  try {
    if (request.method === "POST") {
      const body = await request.json();
      const { search } = body;
      const data = await models.info_image.findAll({attributes:["path_Img","img_ID","UserID","user_like"], where: {imgName: { [Op.like]: `%${search}%` },status_img:'public'}, raw: true});
      const userID = data.map((item: any) => item.UserID);
      const userData = await models.User.findAll({attributes:["UserID","name","path_profile"], where: {UserID: userID}, raw: true});
      // console.log('data ---------------------------- : ',data)
      const matchedData: any[] = [];
      data.forEach((imageItem: any) => {
        const matchedUser = userData.find((userItem: any) => userItem.UserID === imageItem.UserID);
        if (matchedUser) {  
          // console.log("Matched Data ------------------------- sreach: ", "!Imgurl=" + imageItem.path_Img + "?id=" + imageItem.img_ID + "?like=" + imageItem.user_like + "|path_profile=" + matchedUser.path_profile + "?name=" + matchedUser.name,);
          matchedData.push({
            imageUrl: "!Imgurl=" + imageItem.path_Img + "?id=" + imageItem.img_ID + "?like=" + imageItem.user_like + "|path_profile=" + matchedUser.path_profile + "?name=" + matchedUser.name,
          });
        }
      });
      const datas = matchedData;
      return NextResponse.json({
        istrue: true,
        message: "Success",
        status: 200,
        img_url: datas,
      });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ istrue: false, message: "Error", status: 500 });
  }
}

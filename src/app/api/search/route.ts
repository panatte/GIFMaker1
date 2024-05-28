import { NextResponse, NextRequest } from "next/server";
import { Op } from "sequelize";
import models from "@/app/utils/models";

// สร้าง interface สำหรับข้อมูลที่เกี่ยวข้อง
interface InfoImage {
  path_Img: string;
  img_ID: number;
  UserID: number;
  user_like: number;
}

interface User {
  UserID: number;
  name: string;
  path_profile: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { search } = body;

    // ค้นหา image ข้อมูลที่ตรงกับ search term
    const data = await models.info_image.findAll({
      attributes: ["path_Img", "img_ID", "UserID", "user_like"],
      where: {
        imgName: { [Op.like]: `%${search}%` },
        status_img: 'public',
      },
      raw: true,
    }) as unknown as InfoImage[]; // Convert the type to InfoImage[]

    // ดึง UserID ทั้งหมดจาก image data
    const userID = data.map((item: InfoImage) => item.UserID);

    // ค้นหาข้อมูลผู้ใช้ที่ตรงกับ UserID เหล่านั้น
    const userData = await models.User.findAll({
      attributes: ["UserID", "name", "path_profile"],
      where: { UserID: userID },
      raw: true,
    }) as unknown as User[]; // Convert the type to User[]

    const matchedData: any[] = [];

    // จับคู่ image data กับ user data
    data.forEach((imageItem: InfoImage) => {
      const matchedUser = userData.find((userItem: User) => userItem.UserID === imageItem.UserID);
      if (matchedUser) {
        matchedData.push({
          imageUrl: `!Imgurl=${imageItem.path_Img}?id=${imageItem.img_ID}?like=${imageItem.user_like}|path_profile=${matchedUser.path_profile}?name=${matchedUser.name}`,
        });
      }
    });

    return NextResponse.json({
      istrue: true,
      message: "Success",
      status: 200,
      img_url: matchedData,
    });
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ istrue: false, message: "Error", status: 500 });
  }
}
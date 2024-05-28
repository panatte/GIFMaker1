import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";

export async function POST(request: NextRequest) {
  try {
    if (request.method == "POST") {
      const body = await request.json();
      const { sort } = body;
      if (sort === "latest") {
        // ดึงข้อมูลรูปภาพที่มี status เป็น public
        const imageData = await models.info_image.findAll({
          attributes: ["path_Img", "img_ID", "user_like", "UserID"],
          where: {
            status_img: 'public' // เงื่อนไขการเช็คค่า status
          },
          order: [['timestamp', 'ASC']],
          raw: true
        }) as any;

        // สร้าง URL และดึง UserIDs
        const imageUrls = imageData.map((item: any) => item.path_Img + "?id=" + item.img_ID + "&like=" + item.user_like);
        const userIds = imageData.map((item: any) => item.UserID);

        // ดึงข้อมูลผู้ใช้โดยใช้ UserIDs
        const userData = await models.User.findAll({
          attributes: ["UserID", "name", "path_profile"], // เพิ่ม UserID ใน attributes เพื่อเช็คการตรงกัน
          where: {
            UserID: userIds // สมมติว่าชื่อคอลัมน์ primary key ใน model User คือ 'UserID'
          },
          raw: true
        }) as any;

        // สร้าง URL สำหรับโปรไฟล์ผู้ใช้
        const userUrls = userData.map((item: any) => item.path_profile + "?name=" + item.name);

        // สร้างรายการสำหรับเก็บข้อมูลที่ UserID ตรงกัน
        const matchedData: any[] = [];

        imageData.forEach((imageItem: any) => {
          const matchedUser = userData.find((userItem: any) => userItem.UserID === imageItem.UserID);
          if (matchedUser) {
            matchedData.push({
              imageUrl: "!Imgurl=" + imageItem.path_Img + "?id=" + imageItem.img_ID + "?like=" + imageItem.user_like + "|path_profile=" + matchedUser.path_profile + "?name=" + matchedUser.name,
            });
          }
        });

        console.log("Matched Data: ", matchedData);

        const datas = matchedData;
        return NextResponse.json({ message: "Success", status: 200, img_url: datas, sort: sort });

      } else if (sort === "popular") {

        const imageData = await models.info_image.findAll({
          attributes: ["path_Img", "img_ID", "user_like", "UserID"],
          where: {
            status_img: 'public' // เงื่อนไขการเช็คค่า status
          },
          order: [['user_like', 'DESC']],
          raw: true
        }) as any;

        // สร้าง URL สำหรับรูปภาพและดึง UserIDs
        // const imageUrls = imageData.map((item: any) => `${item.path_Img}?id=${item.img_ID}&like=${item.user_like}`);
        const imageUrls = imageData.map((item: any) => item.path_Img + "?id=" + item.img_ID + "&like=" + item.user_like);
        const userIds = imageData.map((item: any) => item.UserID);

        // ดึงข้อมูลผู้ใช้โดยใช้ UserIDs
        const userData = await models.User.findAll({
          attributes: ["UserID", "name", "path_profile"], // รวม UserID ใน attributes เพื่อใช้ในการตรวจสอบ
          where: {
            UserID: userIds // สมมติว่าชื่อคอลัมน์ primary key ใน model User คือ 'UserID'
          },
          raw: true
        }) as any;

        const userUrls = userData.map((item: any) => item.path_profile + "?name=" + item.name);

        // สร้างรายการสำหรับเก็บข้อมูลที่ UserID ตรงกัน
        const matchedData: any[] = [];

        imageData.forEach((imageItem: any) => {
          const matchedUser = userData.find((userItem: any) => userItem.UserID === imageItem.UserID);
          if (matchedUser) {
            matchedData.push({
              imageUrl: "!Imgurl=" + imageItem.path_Img + "?id=" + imageItem.img_ID + "?like=" + imageItem.user_like + "|path_profile=" + matchedUser.path_profile + "?name=" + matchedUser.name,
            });
          }
        });
        const datas = matchedData;
        return NextResponse.json({ message: "Success", status: 200, img_url: datas, sort: sort });
      }
      return NextResponse.json({ istrue: true, message: "Success", status: 200 });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ istrue: false, message: "Error", status: 500 });
  }
}

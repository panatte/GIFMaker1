import { NextRequest, NextResponse } from "next/server";
import models from "../../utils/models";
import { Op } from "sequelize";

export async function POST(req: NextRequest) {
    try {
        if (req.method === 'POST') {
            const { categories_ } = await req.json();
            const categories = await models.info_image.findAll({
                where: {
                    tagNames: {
                        [Op.like]: '%' + categories_ + '%'
                    },
                    status_img: 'public'
                },
                raw: true
            });
            console.log('categories -------------------------- ',categories);
            const UserIDs = categories.map((item: any) => item.UserID);
            console.log('userid -------------------------- ',UserIDs);
            const userData = await models.User.findAll({
                attributes: ["UserID", "name", "path_profile"],
                where: {
                    UserID: UserIDs
                },
                raw: true
            }) as any;

            const matchedData: any[] = [];
            categories.forEach((categories: any) => {
                const matchedUser = userData.find((userItem: any) => userItem.UserID === categories.UserID);
                if (matchedUser) {
                    matchedData.push({
                        imageUrl: "!Imgurl=" + categories.path_Img + "?id=" + categories.img_ID + "?like=" + categories.user_like + "|path_profile=" + matchedUser.path_profile + "?name=" + matchedUser.name,
                    });
                }
            });

            const datas = matchedData;
            return NextResponse.json({ data: datas, status: 200, categories: categories_ });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: 500, body: "Internal Server Error" });
    }
}

import { NextResponse, NextRequest } from "next/server";
import models from "@/app/utils/models";

export async function POST(request: NextRequest) {
    try {
        if (request.method == "POST") {
            const body = await request.json();
            const { userid } = body;

            const data = await models.User.findAll({ attributes: ["Username", "Password", "email", "name", "path_profile"], where: { UserID: userid }, raw: true });
            // const datas = data.map((item: any) => item.Username+"?password="+item.Password+"?name="+item.name+"?email="+item.email);
            const datas = data.map((item: any) => item.Username + "?password=" + item.Password + "?name=" + item.name + "?email=" + item.email + "?path_profile=" + item.path_profile);
            return NextResponse.json({
                istrue: true,
                message: "Success",
                status: 200,
                data: datas,
            });
        }
    } catch (error) {
        console.log("Error During login : ", error);
        return NextResponse.json({ message: "Error", status: 500 });
    }
}
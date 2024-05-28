import { NextRequest, NextResponse } from "next/server";
import models from "@/app/utils/models";

export async function POST(request: NextRequest) {
    try {
        if (request.method === "POST") {
            const body = await request.json();
            const { newpassword, userid } = body;
            console.log("newpassword", newpassword);
            console.log("userid", userid);

            await models.User.update({ Password: newpassword }, { where: { UserID: userid } });
            return NextResponse.json({ message: "Password changed", status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Password change failed", status: 404 });
    }
    
}
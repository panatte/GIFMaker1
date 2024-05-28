import { NextRequest, NextResponse } from "next/server";
import models from "@/app/utils/models";
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email } = body;
    const user = await models.User.findOne({
        where: { email: email },
    });
    if (user) {
        return NextResponse.json({ message: "Email exists", status: 200, data: user});
    } else {
        return NextResponse.json({ message: "Email does not exist", status: 404 });
    }
}
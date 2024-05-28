import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../../utils/models";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 วันในวินาที

export async function POST(request: Request) {
    const body = await request.json();

    const { username, password } = body;

    // ค้นหาผู้ใช้งานจากฐานข้อมูล
    const user = await models.User.findOne({where: {Username: username, Password: password}, raw: true});
    const role = (user as any).role;
    const path_profile = (user as any).path_profile;
    if (!user) {
        return NextResponse.json({
            message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
            status: 401,
        });

    } else {
        const token = sign({UserID : (user as any).UserID ,username: (user as any).Username, role: (user as any).role, pathProfile : (user as any).path_profile, name: (user as any).name},"secret", {
            expiresIn: MAX_AGE,
        });
        // console.log(token);
        
        return NextResponse.json({
            message: "เข้าสู่ระบบสำเร็จ",
            token,
            role: role,
            path_profile,
            status: 200,
        });
    }
    
}
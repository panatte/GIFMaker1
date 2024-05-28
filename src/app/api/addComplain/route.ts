import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { img_ID, details,path_img } = body;
        const cookie = req.cookies;
        console.log('img_ID', img_ID, 'details', details);
        // ตรวจสอบว่าค่า cookie ไม่เป็น undefined และไม่ว่างเปล่า
        if (!cookie || !cookie.toString()) {
            return NextResponse.json({ message: "Error: No cookies found", status: 500 });
        }
        
        // ตรวจสอบว่า img_ID และ details มีค่า
        if (!img_ID || !details) {
            return NextResponse.json({ message: "Error: Missing img_ID or details", status: 500 });
        }

        const token = cookie.toString().split("=")[1];
        
        // ตรวจสอบว่าค่า token มีค่าและไม่ว่างเปล่า
        if (!token) {
            return NextResponse.json({ message: "Error: No token found", status: 500 });
        }
        
        const decoded = jwt.verify(token, "secret") as JwtPayload;
        console.log('decoded : ',decoded)
        console.log('new Date().toISOString(): ',new Date().toISOString())
        console.log('decoded.path_img' ,path_img)
        // ตรวจสอบว่าการ decode token สำเร็จและมี UserID
        if (!decoded || !decoded.UserID) {
            return NextResponse.json({ message: "Error: Invalid token", status: 500 });
        }
        
        const timest = new Date().toISOString();
        await models.comP.create({
            img_ID: img_ID,
            detail: details,
            status: "pending",
            Timestamp: timest,
            UserID: decoded.UserID,
            path_img : path_img
        });

        return NextResponse.json({ message: "Complain Added", status: 200 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'File upload failed', status: 400 });
    }
}

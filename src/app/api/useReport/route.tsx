import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";
export async function POST(req: NextRequest) {
    try {  
        const body = await req.json();
        console.log('body : ', body);
        const { imgID } = body;

        // แก้ไขการค้นหาเพื่อใช้ชื่อคอลัมน์ที่ถูกต้อง
        const Img = await models.info_image.findOne({where: { img_ID: imgID }, raw: true });
        
        return NextResponse.json({ message: 'Successfully retrieved image', status: 200, data: Img });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'File uploaded failed', status: 400 });
    }
}
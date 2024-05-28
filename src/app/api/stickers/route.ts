// pages/api/stickers.ts
import { NextResponse, NextRequest } from "next/server";
import { promises as fs } from 'fs'
import path from 'path'

type Data = {
    stickers: string[]
}

export async function POST(req: NextRequest, res: NextResponse<Data>) {
    const stickersDirectory = path.join(process.cwd(), 'public/stickers')
    console.log('stickersDirectory >>>>>>>>>>>>>>>>>>>> : ', stickersDirectory)
    try {
        const filenames = await fs.readdir(stickersDirectory)
        return NextResponse.json({  message: "Success", status: 200,stickers: filenames })
        // res.status(200).json({ stickers: filenames })
    } catch (error) {
        return NextResponse.json({  message: "Error", status: 500,stickers: [] })
        // res.status(500).json({ stickers: [] })
    }
}



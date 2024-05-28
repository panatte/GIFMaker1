import { NextRequest, NextResponse } from "next/server";
import models from "../../utils/models";

export async function POST(req: NextRequest) {
    try {
        if (req.method === 'POST') {
            const categories = await models.Tag.findAll();
            // randomize the categories 5 item
            const randomCategories = categories.sort(() => Math.random() - 0.5).slice(0, 5);
            console.log('random categories:', randomCategories);
            return NextResponse.json({ data: randomCategories, status: 200 });

        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ status: 500, body: "Internal Server Error" });
    }

}
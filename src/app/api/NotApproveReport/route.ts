import { NextRequest, NextResponse } from "next/server";
import models from "../../utils/models";

export async function POST(request: Request) {

    try {
        const body = await request.json();
        const { comp_id } = body;
        await models.comP.destroy({ where: { compID: comp_id } });
        return NextResponse.json({
            message: "Success",
            status: 200,
        });

    } catch (error) {
        const message = "Error during fetch data";
        console.error(error);
        return NextResponse.json({
            message,
            status: 500,
        });
    }
}
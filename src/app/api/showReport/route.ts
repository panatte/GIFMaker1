import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";

export async function POST(request: Request) {
    try{
        const tablecomp = await models.comP.findAll({ raw: true });

        return NextResponse.json({ 
            message: "Success",
            tablecomp, 
            status: 200 
        });

    } catch (error) {
        const message = "Error during fetch data";
        return NextResponse.json({
            message,
            status: 500,
        });
    }
}
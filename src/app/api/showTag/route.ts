import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";

export async function POST(request: Request) {

    try{

        const tableTag = await models.Tag.findAll({ where : { status: 'waiting' }, raw: true});
        console.log('table Tag  : ',tableTag);
        return NextResponse.json({
            tableTag,
            status: 200,
        });

    } catch (error) {
        const message = "Error during fetch data";
        return NextResponse.json({
            message,
            status: 500,
        });

    }
}   
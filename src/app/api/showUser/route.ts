import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";

export async function POST(request: Request) {

    try {

        const tableUser = await models.User.findAll({ where : { role: 'user' }, raw: true});
        console.log(tableUser);

        return NextResponse.json({
            tableUser,
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

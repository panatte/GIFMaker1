import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { tagid_, tags, statusconfirm } = body;
        
        // Create Tag and capture the result
        const newTag = await models.Tag.create({ tagName:tags, status:statusconfirm, UserID: tagid_ });

        // Check if Tag was created successfully
        if (newTag) {
            return NextResponse.json({
                message: "Success",
                status: 200,
            });
        } else {
            throw new Error("Failed to create Tag");
        }
    } catch (error) {
        const message = "Error during fetch data";
        console.error(error);
        return NextResponse.json({
            message,
            status: 500,
        });
    }
}
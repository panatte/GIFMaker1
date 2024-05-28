import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const {tagid_, statusconfirm} = body;
        console.log('TagID : ', tagid_)
        console.log('body : ', body);
        console.log('status : ', statusconfirm);

        const tableTag = await models.Tag.update({ status: statusconfirm }, { where: { TagID: tagid_ } });
        console.log('tableTag api manageTag ------------> : ',tableTag);
        return NextResponse.json({ message: "Success", status: 200 });
    } catch (error) {
        const message = "Error during fetch data";
        return NextResponse.json({
            message,
            status: 500,
        });
    }
}
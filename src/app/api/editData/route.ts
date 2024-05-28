import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import models from "../../utils/models";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const {userid_, username_, password_, role_, email_, name_} = body;
        console.log('UserID : ', userid_)
        console.log('body : ', body);
        console.log('Username : ', username_);
        console.log('Password : ', password_);
        console.log('email : ', email_);
        console.log('role : ', role_);
        console.log('name : ', name_);

        const tableUser = await models.User.update({ Username: username_, Password: password_, role: role_, email: email_, name: name_ }, { where: { UserID: userid_ } });
        console.log('tableUser api editData ------------> : ',tableUser);
        return NextResponse.json({ message: "Success", status: 200 });
    } catch (error) {
        const message = "Error during fetch data";
        return NextResponse.json({
            message,
            status: 500,
        });
    }


}
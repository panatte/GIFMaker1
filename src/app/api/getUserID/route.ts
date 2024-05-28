import { NextResponse, NextRequest} from "next/server";
import { Request } from "express"; // Import the Request type from the 'express' package
import models from "@/app/utils/models";
import { NextApiRequest, NextApiResponse } from 'next';
import jwt,{ sign } from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    try{ // Get the token from the cookie
        console.log('Request method : ',request.method)
        if (request.method == 'POST') {
            const body = await request.json();

            console.log('body ======================> : ',body);

            const { cookieName, cookieValue } = body;
            const decode = jwt.verify(cookieValue, 'secret');
            console.log('decode : ',decode);
            const UsID = (decode as any).UserID;
            return NextResponse.json({ message: 'Cookie : ', UsID , status: 200 });
            // } else {
            //     return NextResponse.json({ message: 'No Cookie header', status: 401 });
            // }
        }
    } catch (error) {
        console.log("Error During login : ", error);
        return NextResponse.json({ message: 'Error', status: 500 });
        // Handle the error here
    }
}

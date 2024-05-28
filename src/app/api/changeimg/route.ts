import { NextRequest, NextResponse } from "next/server";
import models from "../../utils/models";
import { where } from 'sequelize';
import { BlobServiceClient, BlockBlobUploadOptions, StorageSharedKeyCredential } from '@azure/storage-blob';
import jwt, { JwtPayload } from "jsonwebtoken";

const storageAccountName = 'gifmakerstorage';
const storageAccountKey = 'GTVRTSAC2UtTOCgVoWuRtAQ6G6w4LWvbyT/TzWlHKA1uJWZro/CU+sQZPIfA6QtHJQZmlrClfAY7+AStc6Ax0g==';
const containerName = 'profilestores';

export async function POST(request: NextRequest) {
    async function userid() {
        try {
            const cookie = request.cookies;
            const token = cookie.toString().split("=")[1];
            const decoded = jwt.verify(token, "secret") as JwtPayload;
            if (decoded) {
                return decoded.UserID;
            } else {
                return null;
            }

        } catch (error) {
            console.log('Error in userid : ', error);
        }

    }
    // const uID = await userid();
    // console.log('uID >>>>>>>>>>>>>>>>>>>> : ', uID);
    // const body = await request.formData();
    // const file: File = body.get('image') as unknown as File;
    // const nameimg = file;
    // try  {
    //     const body = await request.formData();
    //         const file : File = body.get('image') as unknown as File;
    //         const nameimg = file;
    //         console.log('nameimg >>>>>>>>>>>>>>>>>>>> : ', nameimg);
    // } catch (error) {
    //     console.log('Error in nameimg : ', error);
    // }
    try {
        if (request.method === 'POST') {
            const body = await request.formData();

            console.log('body >>>>>>>>>>>>>>>>>>>> : ', body)

            const file: File = body.get('image') as unknown as File;
            console.log('file >>>>>>>>>>>>>>>>>>>> : ', file);
            const uID = await userid();
            console.log('uID >>>>>>>>>>>>>>>>>>>> : ', uID);
            const blob = file;

            const options: BlockBlobUploadOptions = {
                blobHTTPHeaders: { blobContentType: file.type }
            };
            const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
            const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net`, sharedKeyCredential);
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobName = `profile-${uID}-image.png`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(await blob.arrayBuffer(), options);
            const imgURL = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`;

            models.User.update({ path_profile: imgURL }, { where: { UserID: uID } });
            return NextResponse.json({ message: 'success', status: 200 });

        }

    } catch (error) {
        console.log("error ================================= ", error)
        return NextResponse.json({ message: "Error in registration", status: 500 });
    }
}
import { NextRequest, NextResponse } from "next/server";
import models from "../../utils/models";
import { where } from 'sequelize';
import { BlobServiceClient, BlockBlobUploadOptions, StorageSharedKeyCredential } from '@azure/storage-blob';

const storageAccountName = 'gifmakerstorage';
const storageAccountKey = 'GTVRTSAC2UtTOCgVoWuRtAQ6G6w4LWvbyT/TzWlHKA1uJWZro/CU+sQZPIfA6QtHJQZmlrClfAY7+AStc6Ax0g==';
const containerName = 'profilestores';

async function createUser( userDetails: any ) {
    try{
        const newUser = await models.User.create(userDetails);
    }   catch (error) {
        console.log("Error creating user: ", error);
    }
   

}

export async function POST(request: Request) {
    try {
        const body = await request.formData();
        console.log("body", body);
        // const { username,password, cpassword, email, name, profileimg } = body;
        const username = body.get('username');
        const password = body.get('password');
        const cpassword = body.get('cpassword');
        const email = body.get('email');
        const name = body.get('name');
        const profileimg = body.get('file');
        // const img = profileimg !== null ? profileimg.split(";") : null;
        const blob = profileimg as File;
        const status = 'active';
        const role = "user";

        // console.log('username', username, 'password', password, 'cpassword', cpassword, 'email', email, 'name', name, 'profileimg', profileimg, 'blob', blob, 'status', status, 'role', role);
        console.log('blob check ------------------------------ ', blob)
        console.log('blob check ------------------------------ ', blob !== null)
        console.log('blob check ------------------------------ ', blob.type)
        if (blob instanceof Blob ){
            console.log("blob if ------------------------------ ", blob);
            const options: BlockBlobUploadOptions = {
                blobHTTPHeaders: { blobContentType: blob.type }
            };

            const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
            const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net`, sharedKeyCredential);
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobName = `${name}-image.png`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(await blob.arrayBuffer(), options);
            const imgURL = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`;

            const newUserDetails = {
                Username : username,
                Password : password,
                email : email,
                status : status,
                role : role,
                name : name,
                path_profile : imgURL
            }

            // createUser(newUserDetails);
            models.User.create({
                Username: username,
                Password: password,
                email: email,
                status: status,
                role: role,
                name: name,
                path_profile: imgURL
              }).then(user => {
                console.log("User created successfully:", user);
              }).catch(error => {
                console.error("Error creating user:", error);
              });
            return NextResponse.json({ message: { username, email, password }, status: 200 });

        } else {
            console.log("blob else ------------------------------ ", blob);
            models.User.create({ Username: username, Password: password, email: email, status: status, role: role, name: name, path_profile: 'null'});
            return NextResponse.json({ message: { username, email, password }, status: 200 });
        }

    } catch (error) {
        console.log("error ================================= ", error)
        return NextResponse.json({ message: "Error in registration", status: 500 });
    }
}


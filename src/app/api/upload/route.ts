import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import models from "../../utils/models";
import jwt, { JwtPayload  } from "jsonwebtoken";
import { BlobServiceClient, BlockBlobUploadOptions, StorageSharedKeyCredential } from '@azure/storage-blob';
import { where } from 'sequelize';
const storageAccountName = 'gifmakerstorage';
const storageAccountKey = 'GTVRTSAC2UtTOCgVoWuRtAQ6G6w4LWvbyT/TzWlHKA1uJWZro/CU+sQZPIfA6QtHJQZmlrClfAY7+AStc6Ax0g==';
const containerName = 'gifstorage';


async function UploadMysql(uID: number, nameImg : string, time : number, url : string, description : string, tagname : string){  
  const timstamp = time.toString();
  const status = 'public';
  const Userid = uID;
  const TagName = tagname;
  const user_like = 0
  console.log('nameImg : ', nameImg);
  console.log('timestamp : ', timstamp);
  console.log('url : ', url); 
  console.log('UserID : ', Userid);
  console.log('status : ', status);
  console.log('TagNames : ', tagname);
  try {
    const data = await models.info_image.create({imgName: nameImg, timestamp: timstamp, path_Img: url, UserID: Userid, status_img: status, TagNames: TagName, user_like: user_like, description: description});
    console.log('data : ', data);

  } catch (error) {

    console.log('Error in UploadMysql : ', error);

  }
  
};

export async function POST(request : NextRequest){

  async function userid(){
    try{
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

  if (request.method === 'POST') {
    try {
      const data = await request.formData();
      const file : File = data.get('image') as unknown as File;
      const nameFile = data.get('name') as string;
      const tag = data.get('tag') as string;
      const uID = await userid();
      const description = data.get('description') as string;
      console.log('nameFile : ', nameFile);
      console.log('description : ', description);
      const blob = file;
      console.log('Uploading image api blob :', blob);
      const options: BlockBlobUploadOptions = {
          blobHTTPHeaders: { blobContentType: file.type }
        };
      // const blob = new Blob([file], { type: 'image/gif' });
      const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
      const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net`, sharedKeyCredential);
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobName = `foldergif/${nameFile}-image.gif`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const ImgUrl = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`;
      
      UploadMysql(uID, nameFile, Date.now(),  ImgUrl, description, tag);

      // อัปโหลด Blob
      await blockBlobClient.uploadData(await blob.arrayBuffer(), options);

      console.log('file : ', file);
      return NextResponse.json({ message: 'File uploaded successfully',  status: 200});
    } catch (error) {
      console.error('Error uploading file : ', error);
      return NextResponse.json({ message: ' REQ == POST. Error in file upload ', status: 500 });
    }
      
      } else {
      return NextResponse.json({ message: 'Error in file upload', status: 500 });
      }
  }
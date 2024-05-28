// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';

// route.ts
export async function GET(req: NextRequest) {

    if (req.method === 'GET') {
        console.log('GET request');
        console.log('req : ', req.method);
        
        try {
            const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
            if (!connectionString) {
                throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable is not defined.');
            }
            const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
            const containerClient = blobServiceClient.getContainerClient('gifstorage');
            const prefix = 'foldergif/';
            const urls: string[] = [];
            for await (const blob of containerClient.listBlobsFlat({ prefix })) {
                console.log("Blob:", blob.name);
                const imageURL = containerClient.getBlobClient(blob.name).url;
                urls.push(imageURL);
            }
            console.log('Images fetched:', urls);

            return NextResponse.json({ urls });

        } catch (error) {
            console.error('Error fetching images:', error);
            return NextResponse.json({ message: 'Error fetching images' });
        }
       
    } else {
        return NextResponse.json({ message: 'Method not allowed' });
    
    }
} ;
 // handle GET request
     // try {
        //     const connectionString = "DefaultEndpointsProtocol=https;AccountName=gifmakerstorage;AccountKey=8jx9OFPJUBam45j0LBiC4hAWBuHa/oFrgb+hqVnErfr7fjhHlGHyDEITtdyq7jLLY3Px7WF8n2e6+AStjWU+yA==;EndpointSuffix=core.windows.net";
        //     if (!connectionString) {
        //         throw new Error('Azure Storage connection string is not defined.');
        //     }

        //     const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        //     const containerClient = blobServiceClient.getContainerClient('gifstorage');
        //     const prefix = 'foldergif/';

        //     const urls: string[] = [];

        //     for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        //         console.log("Blob:", blob.name);
        //         const imageURL = containerClient.getBlobClient(blob.name).url;
        //         urls.push(imageURL);
        //     }
        //     console.log('Images fetched:', urls);
        //     return res.json({ urls });

        // } catch (error) {
        //     console.error('Error fetching images:', error);
        //     return res.json({ error: 'Error fetching images' });
        // }
    // try {
    //     const connectionString = "DefaultEndpointsProtocol=https;AccountName=gifmakerstorage;AccountKey=8jx9OFPJUBam45j0LBiC4hAWBuHa/oFrgb+hqVnErfr7fjhHlGHyDEITtdyq7jLLY3Px7WF8n2e6+AStjWU+yA==;EndpointSuffix=core.windows.net";
    //     if (!connectionString) {
    //         throw new Error('Azure Storage connection string is not defined.');
    //     }

    //     const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    //     const containerClient = blobServiceClient.getContainerClient('gifstorage');
    //     const prefix = 'foldergif/';

    //     const urls: string[] = [];

    //     for await (const blob of containerClient.listBlobsFlat({ prefix })) {
    //         console.log("Blob:", blob.name);
    //         const imageURL = containerClient.getBlobClient(blob.name).url;
    //         urls.push(imageURL);
    //     }
    //     console.log('Images fetched:', urls);
    //     return res.json({ urls });

    // } catch (error) {
    //     console.error('Error fetching images:', error);
    //     return res.json({ error: 'Error fetching images' });
    // }


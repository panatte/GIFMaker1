import ffmpeg from 'ffmpeg-static';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  const inputFilePath = file;
  const outputFilePath = 'public/output.mp4';

  const command = `${ffmpeg} -i ${inputFilePath} ${outputFilePath}`;

  const { exec } = require('child_process');
  exec(command, (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.error(err);
      return NextResponse.json({ error: err });
    }
    console.log('stdout --------------------- ',stdout);
    return NextResponse.json({ success: 'Video converted successfully', stdout});
  });
  
};


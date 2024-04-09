import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

const aws_access_key = "AKIA4MTWJZCFZ6KB3JUM"
const aws_secret_key = "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"

    export async function POST(req) {
      const data =  await req.formData();
      if (data.get('file')) {
        // upload the file
        const file = data.get('file');
    
        const s3Client = new S3Client({
          region: 'us-east-1',
          credentials: {
            accessKeyId: aws_access_key,
            secretAccessKey: aws_secret_key,
          },
        });
    
        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;
    
        const chunks = [];
        for await (const chunk of file.stream()) {
          chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
    
        const bucket = 't-food-ordering';
        await s3Client.send(new PutObjectCommand({
          Bucket: bucket,
          Key: newFileName,
          ACL: 'public-read',
          ContentType: file.type,
          Body: buffer,
        }));
    
    
        const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
        return Response.json(link);
      }
      return Response.json(true);
    }
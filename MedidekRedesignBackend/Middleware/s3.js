import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import {CloudFrontClient,CreateInvalidationCommand} from "@aws-sdk/client-cloudfront"


// const bucketName = "mainmedidek"
// const region = "ap-south-1"
// const accessKeyId = "AKIAYYFIKK6M4D2VU7UU"
// const secretAccessKey = "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"
const bucketName = "cureohealthcare"
const region = "ap-south-1"
const accessKeyId = "AKIA4MTWKMSJGQJ7QPL4"
const secretAccessKey = "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"

const cloudfront = new CloudFrontClient({
  region,
  credentials:{
    accessKeyId,
    secretAccessKey
  }
})


const medicalbucketname ="medicalhealth"
const medicalregion = "ap-south-1"
const medicalhistoryaccessKeyId ="AKIA4MTWKMSJPZ52XJ3U"
const medicalhistorysecretAccessKey ="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"



const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })
const medicalhistoryclient = new S3Client({
       region:medicalregion,
    credentials: {
    accessKeyId:medicalhistoryaccessKeyId,
   secretAccessKey: medicalhistorysecretAccessKey
    }
  })

const medicalhistoryuploadFile =(fileBuffer, fileName, mimetype)=>{
    const uploadParams = {
        Bucket: medicalbucketname,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
      }
return medicalhistoryclient.send(new PutObjectCommand(uploadParams));
}
const uploadFile =(fileBuffer, fileName, mimetype)=>{
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
      }
return s3Client.send(new PutObjectCommand(uploadParams));
}

const medicalhistorydeleteFile =(fileName)=>{
    const deleteParams = {
        Bucket: medicalbucketname,
        Key: fileName,
      }
return medicalhistoryclient.send(new DeleteObjectCommand(deleteParams));
}
const deleteFile =(fileName)=>{
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
      }
return s3Client.send(new DeleteObjectCommand(deleteParams));
}


const getObjectSignedUrl =async(key)=>{
    const params = {
        Bucket: bucketName,
        Key: key
      }
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(s3Client, command);
      return url
}
export {
    getObjectSignedUrl,
    uploadFile,
    deleteFile,
    medicalhistoryuploadFile,
    medicalhistorydeleteFile,
    cloudfront
}
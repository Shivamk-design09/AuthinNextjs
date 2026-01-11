/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary'
import { arrayBuffer, buffer } from 'stream/consumers'

// we have to config the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//we will make a function
//  where we will upload the image and cloudinay will give us string URL
// when we send data from forntend it is blob type

// we dont store file as it is on cloudinay because it is comming as a blob =(binay large object)
// we have to convert the blob in node js buffer


// file is okey in js but in typscript we provide type which is Blob
// blob is binary large object which is commign from from which only uderstand browser 
// to send this to cloudniary we convert it to buffer
const uploadOnCloudinary = async (file: Blob | null): Promise<string | null> => {

    if (!file) {
        return null
    }

    try {
        //node js only understands buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        return new Promise((resolve,reject)=>{
          const uploadStream  =  cloudinary.uploader.upload_stream(
            {resource_type:"auto"},
             (error,result)=>{
                if(error){
                    reject(error)
                }else{
                    resolve(result?.secure_url ?? null)
                }
             }
          )
          // end = upload on cludinary 
          uploadStream.end(buffer)
        })
    } catch (error) {
        console.log(error)
        return null
    }
}


export default uploadOnCloudinary
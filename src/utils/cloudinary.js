import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs';



    // Configuration
cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET 
 });

    // Upload an image
     const uploadResult = async (localFilePath)=>{
            try {
                if(!localFilePath)return null;
                const response =await cloudinary.uploader.upload(localFilePath,{
                    resource_type:"auto"
                })
                console.log("the file has been uploaded ",response.url);
                return response;
            } catch (error) {
                fs.unlink(localFilePath)
                return null;
            }
     }
       
   export {uploadResult}
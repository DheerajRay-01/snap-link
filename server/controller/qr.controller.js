import QRCode from 'qrcode'
import fs from 'fs'
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from '../utils/asyncHandler.js';
import { Link } from '../models/Link.model.js';
import ApiError from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateQR = asyncHandler(async (req, res) => {
  console.log("hello");
  
  const { slug } = req.body;
  console.log(slug);
  

  if (!slug) {
    throw new ApiError(400, "Slug missing");
  }

  const urlDoc = await Link.findOne({ slug }).select("shortUrl qrUrl");

  if (!urlDoc) {
    throw new ApiError(404, "Short URL not found");
  }

  if(urlDoc.qrUrl != null) {
    throw new ApiError(404, "Already Qr Generated for this URL");
  }

  const localQRPath = `./public/images/qr_${slug}.png`;

  try {
    // Generate and save QR code to local file
    await QRCode.toFile(localQRPath, urlDoc.shortUrl);

    // Upload the local QR image to Cloudinary
    const cloudinaryURL = await UploadOnCloudinary(slug);

    // Delete the local file if Cloudinary upload succeeded
    if (cloudinaryURL) {
      fs.unlink(localQRPath, (err) => {
        if (err) {
          console.error("Failed to delete local file:", err.message);
        } else {
          console.log(`${localQRPath} was deleted`);
        }
      });
    }
    // Save QR URL to DB
    await Link.findOneAndUpdate({ slug }, { qrUrl: cloudinaryURL });

    return res
      .status(200)
      .json(new ApiResponse(200, { qrUrl: cloudinaryURL }, "QR code generated successfully"));
  } catch (error) {
    console.error("QR generation error:", error);
    throw new ApiError(500,"Failed to generate QR code")
  }
});

const fetchQr = asyncHandler(async(req,res)=>{
  const user = req.user?._id;
  const {l,p} = req.query
  console.log("page",l,p);
  
  const skip = l*p
  
  const allQr = await Link.find({user,qrUrl: { $ne: null }}).select("qrUrl title shortUrl createdAt slug").sort({createdAt:-1}).limit(l).skip(skip).lean()
  if(!allQr || allQr.length < 0){
    throw new ApiError(400 , "not found")
  }
  
  // console.log(allQr);
  res.status(200).json(new ApiResponse(200,{allQr},"fetched"))
}) 


const deleteQr = asyncHandler(async(req,res)=>{
  const slug = req.params.slug

   if (!slug) {
    throw new ApiError(404, "Slug not found");
  }

  const exist = await Link.findOne({slug})
    if (!exist) {
    throw new ApiError(404, "Slug not found");
  }


  if(exist.qrUrl == null){
    throw new ApiError(404, "Qr not found");
  }

  exist.qrUrl = null
  await exist.save()
  
  return res.status(200)
  .json(new ApiResponse(200,{delete:"Ok"},"Delete Successfully" ))

})




export {
    generateQR,
    fetchQr,
    deleteQr
}
import { v2 as cloudinary } from 'cloudinary';

export const UploadOnCloudinary = async function (slug) {
  // Cloudinary Configuration
  cloudinary.config({
    cloud_name: 'ddivcdnu4',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const filePath = `./public/images/qr_${slug}.png`;

  try {
    // Upload the image from a local path or URL
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      public_id: slug,
    });

    console.log("Uploaded Successfully:", uploadResult.secure_url);

   const imageURL = cloudinary.url(slug, {
                        fetch_format: "auto", // keep it modern
                        quality: "auto:best"  // keeps higher quality, but still optimizes a bit
                    })
    return imageURL;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

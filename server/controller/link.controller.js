import { Click } from "../models/clicks.model.js";
import { Link } from "../models/Link.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getLocation } from "../utils/getLocationById.js";
import { checkClickLimit, generateSlug, hashPassword } from "../utils/link_utils.js";
import bcrypt from 'bcrypt'


const createShortLink = asyncHandler(async (req, res) => {
  const user = req.user?._id || null
  const { url, slug } = req.body;
  const password = req.body?.password || null;
  const clickLimit = req.body?.clickLimit || 0;
  const title = req.body?.title || "Untitled"

  console.log(password);
  

  //  Validate URL
  if (!url || !(url.startsWith("http://") || url.startsWith("https://"))) {
    throw new ApiError(400, "Please provide a valid URL starting with http:// or https://");
  }

  // Validate custom slug length (if provided)
  if (slug && slug.length < 6) {
    throw new ApiError(400, "Custom slug must be at least 6 characters long");
  }
  if (password && password.length < 6) {
    throw new ApiError(400, "password slug must be at least 6 characters long");
  }

  // Generate slug (custom or nanoid)
  const new_slug = generateSlug(slug);

  if (!new_slug) {
    throw new ApiError(400, "Failed to generate slug");
  }

  // Check for existing slug
  const isSlugExist = await Link.findOne({ slug: new_slug });

  if (isSlugExist) {
    throw new ApiError(409, "Slug already exists. Please choose another one.");
  }
  let hashedPass = null;
  if(password){
    hashedPass = await hashPassword(password)
    console.log(hashPassword);
  }

  // Create short URL
  const newShortUrl = await Link.create({
    originalUrl: url,
    shortUrl: `${process.env.CORS_ORIGIN}/${new_slug}`,
    slug: new_slug,
    isProtected: hashedPass ? true : false,
    password: hashedPass ? hashedPass : null,
    clickLimit: clickLimit,
    user,
    title,
  });

  const shortUrl = await Link.findById(newShortUrl._id)

  // Respond
  return res
    .status(201)
    .json(new ApiResponse(201, shortUrl, "Short URL created successfully"));
});



const createShortLinkByGuest = asyncHandler(async (req, res) => {
  
  const { url, slug } = req.body;
  //  Validate URL
  if (!url || !(url.startsWith("http://") || url.startsWith("https://"))) {
    throw new ApiError(400, "Please provide a valid URL starting with http:// or https://");
  }

  // Validate custom slug length (if provided)
  if (slug && slug.length < 6) {
    throw new ApiError(400, "Custom slug must be at least 6 characters long");
  }

  // Generate slug (custom or nanoid)
  const new_slug = generateSlug(slug);

  if (!new_slug) {
    throw new ApiError(400, "Failed to generate slug");
  }

  // Check for existing slug
  const isSlugExist = await Link.findOne({ slug: new_slug });

  if (isSlugExist) {
    throw new ApiError(409, "Slug already exists. Please choose another one.");
  }
  // Create short URL
  const newShortUrl = await Link.create({
    originalUrl: url,
    shortUrl: `${process.env.CORS_ORIGIN}/${new_slug}`,
    slug: new_slug,
  });

  const shortUrl = await Link.findById(newShortUrl._id)

  // Respond
  return res
    .status(201)
    .json(new ApiResponse(201, shortUrl, "Short URL created successfully"));
});



const redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const clickData = req.clickData;

  // console.log("clickData", clickData);

  const { slug } = req.params;

  // Find the original URL from the slug
  const findUrl = await Link.findOne({ slug });
  if (!findUrl) {
    throw new ApiError(404, "Short URL not found");
  }

  if (!findUrl.active) {
    throw new ApiError(404, "This URL is currently inactive");
  }

  if (!checkClickLimit(findUrl.clickLimit, findUrl.clicks)) {
    throw new ApiError(403, "Click limit reached for this URL");
  }

  // If the URL is password protected
  if (findUrl.isProtected) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { protected: true, slug }, "URL is protected")
      );
  }

  // Increment the click count
  await Link.findByIdAndUpdate(findUrl._id, {
    $inc: { clicks: 1 },
  });

  // Save click details in the background (non-blocking)
  (async () => {
    try {
      const { city, country } = await getLocation(clickData.ip);
      console.log(city,country);
      
      const clickRes=  await Click.create({
        ...clickData,
        city,
        country,
        urlId: findUrl._id,
      });
      console.log("click Response",clickRes);
      
    } catch (err) {
      console.error("Error saving click details:", err.message);
    }
  })();

  // Return the original URL to the user
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { originalURL: findUrl.originalUrl },
        "Successfully fetched original URL"
      )
    );
});


const protectedLinks = asyncHandler(async (req, res) => {
  const { slug, password } = req.body;
  const clickData = req.clickData
  
  if (!slug || !password) {
    throw new ApiError(400, "Slug or password missing");
  }
  
  const findUrl = await Link.findOne({ slug }).select("+password");
  
  if (!findUrl || !findUrl.password) {
    throw new ApiError(404, "Short URL not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password.toString(), findUrl.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password");
  }

if(!checkClickLimit(findUrl.clickLimit , findUrl.clicks)){
  throw new ApiError(403, "Click limit reached for this URL");  
}
  

  await Link.findByIdAndUpdate(
  findUrl._id,
  {
    $inc: { clicks: 1 }
  }
);

    const clickRes =  await Click.create({...clickData,urlId:findUrl._id})
    console.log("clickRes",clickRes);

  return res.status(200).json(new ApiResponse(200, {slug:findUrl.slug,originalUrl:findUrl.originalUrl},"Password Verified"))
  
});


const urlDetails = asyncHandler(async(req,res)=>{
  const {slug} = req.params
    if (!slug ) {
    throw new ApiError(400, "Slug missing");
  }

  const urlDetails = await Link.findOne({slug})

    if (!urlDetails ) {
    throw new ApiError(400, "error in fetch details");
  }

  return res.status(200).json(new ApiResponse(200,urlDetails,"fetched"))

})



const toggleActive = asyncHandler(async (req, res) => {
  const { slug } = req.body;

  if (!slug) {
    throw new ApiError(404, "Slug not found");
  }

  const urlStatus = await Link.findOne({ slug }).select("active");
  
  if (!urlStatus) {
    throw new ApiError(404, "Error while updating active status, slug not found");
  }

  urlStatus.active = !urlStatus.active;
  await urlStatus.save(); 

  return res
    .status(200)
    .json(new ApiResponse(200, { status_updated: true }, "Successfully updated status"));
});



const updateLinkDetails = asyncHandler(async (req, res) => {
  try {
    let { clickLimit, password, isProtected, title } = req.body;
    const slug = req.params.slug;

    const newSlug = req.body.slug;
    console.log(req.body);
    

    // ✅ Validate required slug param
    if (!slug || typeof slug !== "string") {
      throw new ApiError(400, "Invalid or missing slug parameter");
    }

    // ✅ Find the existing link
    const url = await Link.findOne({ slug });
    if (!url) {
      throw new ApiError(404, "Link not found");
    }


    console.log(url);
    
    const updateFields = {};

    // ✅ Update slug and shortUrl if newSlug provided
    if (newSlug !== undefined && newSlug.trim() !== "" && newSlug !== slug) {
      const updatedSlug = generateSlug(newSlug);
      
      // Check if new slug already exists (prevent duplicates)
      const slugExists = await Link.findOne({ slug: updatedSlug });
      if (slugExists) {
        throw new ApiError(409, "Slug already in use. Please choose a different one.");
      }

      updateFields.slug = updatedSlug;
      updateFields.shortUrl = `${process.env.CORS_ORIGIN}/${updatedSlug}`;
    }

    // ✅ Update title if provided
    if (title !== undefined && typeof title === "string" ) {
      updateFields.title = title.trim() ;
    }

    // ✅ Validate and update clickLimit
    if (clickLimit !== undefined) {
      const limit = parseInt(clickLimit, 10);
      if (isNaN(limit) || limit < 0) {
        throw new ApiError(400, "Click limit must be a positive number");
      }
      updateFields.clickLimit = limit;
    }

    // ✅ Handle password protection
    if (isProtected === true) {
      if (!password || password.trim() === "") {
        // throw new ApiError(400, "Password is required when protection is enabled");
        if (url.password) {
          updateFields.password = url.password;
          updateFields.isProtected = true;
        } else {
          updateFields.isProtected = false;
        }
      } else {
        updateFields.password = await bcrypt.hash(password, 10);
        updateFields.isProtected = true;
      }
    } else if (isProtected === false) {
      updateFields.password = null // Remove password field
      updateFields.isProtected = false;
    }

    // console.log("updateFields", updateFields);

    // ✅ Perform update
    const updatedURL = await Link.findOneAndUpdate(
      { slug },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedURL) {
      throw new ApiError(500, "Failed to update link details");
    }
    console.log(updatedURL);
    

    return res
      .status(200)
      .json(new ApiResponse(200, { updatedURL }, "URL data updated successfully"));
  } catch (err) {
    console.error("Update Link Error:", err);

    // ✅ Handle known MongoDB duplicate error
    if (err.code === 11000 && err.keyPattern?.slug) {
      return res.status(409).json(new ApiResponse(409, null, "Slug already exists"));
    }

    // ✅ Fallback for unexpected errors
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    }
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});


const deleteLink = asyncHandler(async(req,res)=>{
  const slug = req.params.slug

   if (!slug) {
    throw new ApiError(404, "Slug not found");
  }

  const exist = await Link.findOne({slug})
    if (!exist) {
    throw new ApiError(404, "Slug not found");
  }


  const deleteResponse = await Link.deleteOne({slug})

  if(!deleteResponse){
    throw new ApiError(404, "failed to delete");
  }

  return res.status(200)
  .json(new ApiResponse(200,{delete:"Ok"},"Delete Successfully" ))

})

// const changePassword = asyncHandler(async(req,res)=>{
//   const {password,slug} = req.body

//    if (!slug) {
//     throw new ApiError(404, "Slug not found");
//   }
//    if (!password) {
//     throw new ApiError(404, "password required");
//   }

//   const exist = await Link.findOne({slug})
//     if (!exist) {
//     throw new ApiError(404, "Slug not found");
//   }




 
//   return res.status(200)
//   .json(new ApiResponse(200,{delete:"Ok"},"Delete Successfully" ))

// })


const fetchMyLinks = asyncHandler(async (req, res) => {
  const user = req.user?._id;
  const {l,p} = req.query
  console.log("page",l,p);
  
  const skip = l*p

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const links = await Link.find({ user }).sort({createdAt:-1}).limit(l).skip(skip).lean();

  // if (!links || links.length === 0) {
  //   throw new ApiError(404, "No links found for this user");
  // } 

  return res.status(200).json(
    new ApiResponse(200, { links }, "Links fetched successfully")
  );
});




export { 
    createShortLink ,
    createShortLinkByGuest,
    redirectToOriginalUrl,
    protectedLinks,
    urlDetails,
    toggleActive,
    updateLinkDetails,
    deleteLink,
    fetchMyLinks
};



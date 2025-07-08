import { Click } from "../models/clicks.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getClickAnalytics } from "../utils/dummyClicks.js";

const getAllClicks = asyncHandler(async (req, res) => {
  const urlId = req.params.id;

  console.log("URL ID:", urlId);

  if (!urlId) {
    throw new ApiError(400, "URL ID is required");
  }

  const clicks = await Click.find({ urlId }).lean();

  if (!clicks || clicks.length === 0) {
    throw new ApiError(404, "No clicks found for this URL");
  }

  console.log("Clicks:", clicks);

  const analyticsData = getClickAnalytics(clicks)
  console.log(analyticsData);
  

  return res.status(200).json(
    new ApiResponse(200, { analyticsData }, "Analytics data fetched successfully")
  );
});

export { getAllClicks };

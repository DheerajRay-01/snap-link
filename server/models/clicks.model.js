import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    ip: {
      type: String,
      default: null,
    },
    browser: {
      type: String,
      default: null,
    },
    os:{
       type: String,
      default: null,
    },
    city:{
       type: String,
      default: null,
    },
    country:{
       type: String,
      default: null,
    },
    userAgent:{
       type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Click = mongoose.model("Click", clickSchema);

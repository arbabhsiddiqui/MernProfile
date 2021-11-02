import mongoose from "mongoose";

const workSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    gitUrl: {
      type: String,
      required: true,
    },
    siteUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Work = mongoose.model("work", workSchema);

export default Work;

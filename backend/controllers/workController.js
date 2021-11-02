import asyncHandler from "express-async-handler";
import Work from "../models/workModel.js";

// @desc    Fetch all works
// @route   GET /api/works
// @access  Public
const getWorks = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Work.countDocuments({ ...keyword });
  const works = await Work.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ works, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single work
// @route   GET /api/works/:id
// @access  Public
const getWorkById = asyncHandler(async (req, res) => {
  const work = await Work.findById(req.params.id);

  if (work) {
    res.json(work);
  } else {
    res.status(404);
    throw new Error("work not found t");
  }
});

// @desc    Delete a work
// @route   DELETE /api/works/:id
// @access  Private/Admin
const deleteWork = asyncHandler(async (req, res) => {
  const work = await Work.findById(req.params.id);
  if (work) {
    await work.remove();
    res.json({ message: "work removed" });
  } else {
    res.status(404);
    throw new Error("work not found");
  }
});

// @desc    Create a work
// @route   POST /api/works
// @access  Private/Admin
const createWork = asyncHandler(async (req, res) => {
  const work = new Work({
    user: req.user._id,
    name: "lorem ipsum",
    image: "/images/E-com.png",
    gitUrl: "none",
    siteUrl: "none",
  });

  const createdWork = await work.save();
  res.status(201).json(createdWork);
});

// @desc    Update a work
// @route   PUT /api/works/:id
// @access  Private/Admin
const updateWork = asyncHandler(async (req, res) => {
  const { name, image, gitUrl, siteUrl } = req.body;

  const work = await Work.findById(req.params.id);

  if (work) {
    work.name = name;
    work.image = image;
    work.gitUrl = gitUrl;
    work.siteUrl = siteUrl;

    const updatedWork = await work.save();
    res.json(updatedWork);
  } else {
    res.status(404);
    throw new Error("work not found");
  }
});

export { getWorks, getWorkById, deleteWork, createWork, updateWork };

import Video from "../models/Video.js";

// Get all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    if (!videos) {
      return res.status(404).json({ msg: "No videos found" });
    }
    res.json(videos);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ msg: "Failed to retrieve videos, please try again later." });
  }
};

// Get a single video by ID
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    console.error(err); // Log the error for debugging
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid video ID format" });
    }
    res.status(500).json({ msg: "Server error, please try again later." });
  }
};

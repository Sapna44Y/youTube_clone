import Channel from "../models/Channel.js";

export const createChannel = async (req, res) => {
  const { name, description } = req.body;

  // Validate the input fields
  if (!name || !description) {
    return res.status(400).json({ msg: "Name and description are required" });
  }

  try {
    // Ensure req.user is available (i.e., user is authenticated)
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: User not authenticated" });
    }

    // Create a new channel instance
    const newChannel = new Channel({
      name,
      description,
      owner: req.user.id, // owner is the user creating the channel
    });

    // Save the new channel to the database
    await newChannel.save();

    // Respond with the newly created channel
    res.status(201).json(newChannel);
  } catch (err) {
    // Log the error for debugging and send a 500 status
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

import { useState } from "react";
import { createChannel } from "../api/channel";

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");

  const handleCreateChannel = async () => {
    try {
      const channelData = { channelName, description, channelBanner };
      await createChannel(channelData);
      alert("Channel created successfully!");
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  return (
    <div>
      <h2>Create a Channel</h2>
      <input
        type="text"
        placeholder="Channel Name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Banner URL"
        value={channelBanner}
        onChange={(e) => setChannelBanner(e.target.value)}
      />
      <button onClick={handleCreateChannel}>Channel Create</button>
    </div>
  );
};

export default CreateChannel;

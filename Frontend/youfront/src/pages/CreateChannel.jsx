// client/src/pages/CreateChannel.js
import React, { useState } from "react";
import { createChannel } from "../api/Service";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    await createChannel({ name, description });
    navigate("/");
  };

  return (
    <div>
      <h2>Create Channel</h2>
      <form onSubmit={handleCreateChannel}>
        <input
          type="text"
          placeholder="Channel Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateChannel;

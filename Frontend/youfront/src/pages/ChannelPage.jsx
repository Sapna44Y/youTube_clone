// client/src/pages/ChannelPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../api/Service";

function ChannelPage() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function loadChannel() {
      const res = await fetchChannel(id);
      setChannel(res.data);
    }
    loadChannel();
  }, [id]);

  return (
    <div>
      {channel && (
        <>
          <h2>{channel.name}</h2>
          <p>{channel.description}</p>
          <div>
            <h3>Videos</h3>
            {channel.videos.map((video) => (
              <div key={video._id}>{video.title}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ChannelPage;

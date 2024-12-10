import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/VideoCard.css";

function VideoCard({ video, loggedInUser, Allvideo }) {
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = (videoId) => {
    const timeout = setTimeout(() => setHoveredVideoId(videoId), 2000);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    setHoveredVideoId(null);
    clearTimeout(hoverTimeout);
  };

  return (
    <Link
      to={`/video/${video._id}`}
      state={{ loggedInUser, Allvideo }}
      className="video-card"
      onMouseEnter={() => handleMouseEnter(video._id)}
      onMouseLeave={handleMouseLeave}
    >
      {hoveredVideoId === video._id ? (
        <iframe
          src={video.videoUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          autoPlay
          muted
          loop
          className="thumbnail"
        ></iframe>
      ) : (
        <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />
      )}
      <h3>{video.title}</h3>
      <p>{video.channelName}</p>
      <span>{video.views} views </span>
    </Link>
  );
}

export default VideoCard;

import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchVideo,
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from "../api/Service";
import "../style/VideoPage.css";

function VideoPage() {
  const location = useLocation();
  const { loggedInUser, Allvideo } = location.state || {};
  console.log(loggedInUser);
  const { id: videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [text, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    async function loadVideo() {
      const res = await fetchVideo(videoId);
      setVideo(res.data);
    }

    async function loadComments() {
      const res = await getComments(videoId);
      setComments(res.data);
    }

    const suggestions = Allvideo.filter((video) => video._id !== videoId);
    // console.log(suggestions);
    setSuggestedVideos(suggestions);

    loadVideo();
    loadComments();
  }, [videoId]);

  if (!video || comments.length === 0) {
    return <div>Loading...</div>;
  }

  const handleToggleDescription = () => {
    setShowMore(!showMore);
  };

  const handleAddComment = async () => {
    try {
      const response = await addComment(videoId, { text });
      const addedComment = response.data;

      setComments([addedComment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleEditClick = (id, text) => {
    setEditingCommentId(id);
    setEditedText(text);
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedCommentData = { text: editedText };
      const response = await updateComment(id, updatedCommentData);

      const updatedComment = response.data;

      setComments(
        comments.map((comment) =>
          comment._id === id ? updatedComment : comment
        )
      );
      setEditingCommentId(null);
      setEditedText("");
    } catch (error) {
      console.error("Failed to update comment:", error);
      alert("Failed to update comment. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedText("");
  };

  const refreshComments = async () => {
    const res = await getComments(videoId);
    setComments(res.data);
  };

  return (
    <div className="video-page">
      <div className="video-comment-gp">
        <div className="video-section">
          <iframe
            className="video-player"
            width="100%"
            height="500"
            src={video.videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <h2 className="video-title">{video.title}</h2>

          <div className="video-info">
            <span>{video.views} • 2years ago</span>
            <div className="video-actions">
              <button>👍 {video.likes}</button>
              <button>👎</button>
              <button>Share</button>
              <button>Download</button>
            </div>
          </div>
          <hr />

          <div className="channel-info">
            {loggedInUser ? (
              <img
                src={loggedInUser.profileImage}
                alt="Channel"
                className="channel-image"
              />
            ) : (
              <span className="user-avatar">
                <FaRegUserCircle />
              </span>
            )}
            <div className="channel-details">
              <span className="channel-name">{video.channelName}</span>
              <span className="subscribers">{video.dislikes} subscribers</span>
            </div>
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>

        <div className="video-description">
          <p>
            {showMore
              ? video.description
              : `${video.description.slice(0, 100)}...`}

            <button
              className="show-more-button"
              onClick={handleToggleDescription}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </p>
        </div>

        <div className="comments-section">
          <div className="comments-header">
            <span>{comments.length} Comments</span>
            <button className="sort-button">Sort by</button>
          </div>

          <div className="add-comment">
            {loggedInUser ? (
              <img
                src={loggedInUser.profileImage}
                alt="User Avatar"
                className="user-avatar"
              />
            ) : (
              <span className="user-avatar">
                <FaRegUserCircle />
              </span>
            )}
            <input
              type="text"
              value={text}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment} className="add-comment-button">
              Comment
            </button>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <img
                  src={comment.userId.profileImage}
                  alt="User Avatar"
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="username">{comment.userId.username}</span>
                    <span className="time">{comment.timestamp}</span>
                  </div>
                  {editingCommentId === comment._id ? (
                    <>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="edit-comment-textarea"
                      />
                      <button
                        onClick={() => handleSaveEdit(comment._id)}
                        className="save-edit-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="cancel-edit-button"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <p>{comment.text}</p>
                  )}
                  <div className="comment-actions">
                    <button>👍</button>
                    <button>👎</button>
                    <button>Reply</button>
                    {loggedInUser ? (
                      <>
                        {loggedInUser.username === comment.userId.username && (
                          <>
                            <button
                              onClick={() =>
                                handleEditClick(comment._id, comment.text)
                              }
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="suggested-videos">
        <h3>Suggested Videos</h3>
        {suggestedVideos.map((video) => (
          <div key={video._id} className="suggested-video">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="suggested-thumbnail"
            />
            <div className="suggested-info">
              <span className="suggested-title">{video.title}</span>
              <span className="suggested-channel">{video.channelName}</span>
              <span className="suggested-views">{video.views} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPage;

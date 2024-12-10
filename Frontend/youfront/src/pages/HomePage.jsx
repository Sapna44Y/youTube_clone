import React, { useEffect, useState } from "react";
import { fetchVideos } from "../api/Service";
import VideoCard from "../components/VideoCard";
import youtube_logo from "../assets/youtube_logo.png";
import nothing from "../assets/nothing.png";
import loadingGif from "../assets/loading.gif";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";
import { BsFire } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import SignInPage from "./SignInPage";
import "../style/HomePage.css";
import ChannelPage from "./ChannelPage";

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [originalVideos, setOriginalVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      try {
        const res = await fetchVideos();
        setVideos(res.data);
        setOriginalVideos(res.data);
      } finally {
        setLoading(false);
      }
    }
    loadVideos();
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      "All",
      ...new Set(videos.map((video) => video.category)),
    ];
    setCategories(uniqueCategories);
  }, [videos]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Filter videos based on search query and category
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setVideos(originalVideos);
      console.log("onh");
    } else {
      const filtered = videos.filter(
        (video) =>
          (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.channelName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          (selectedCategory === "All" || video.category === selectedCategory)
      );
      setVideos(filtered);
    }
  };

  // Update filtered videos when category changes
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = videos.filter(
      (video) =>
        (category === "All" || video.category === category) &&
        (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channelName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setVideos(filtered);
  };

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle successful login
  const handleLogin = (user) => {
    setLoggedInUser(user.data.user);
    setIsModalOpen(false); // Close the modal on successful login
  };

  // Toggle profile options dropdown
  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // Logout function
  const handleLogout = () => {
    setLoggedInUser(null);
    setShowProfileOptions(false); // Close the dropdown on logout
  };

  return (
    <div className="home-page">
      <header className="header">
        <button onClick={toggleSidebar} className="hamburger">
          ☰
        </button>
        <img src={youtube_logo} className="logo" alt="Youtube logo" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <IoSearch />
          </button>
        </div>
        {loggedInUser ? (
          <div className="profile-container" onClick={toggleProfileOptions}>
            <img
              src={loggedInUser.profileImage}
              alt="User Profile"
              className="profile-image"
            />
            {showProfileOptions && (
              <div className="profile-options">
                <button onClick={handleLogout}>Create Channel</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="sign-in-button" onClick={openModal}>
            <div className="SignIn">
              <div className="SignIn_icon">
                <FaRegUserCircle />
              </div>{" "}
              Sign In
            </div>
          </button>
        )}
      </header>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <SignInPage
            isOpen={isModalOpen}
            onLogin={handleLogin}
            onClose={closeModal}
          />
        </>
      )}

      <div className="content">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
          <a className="sidebar-link" href="/">
            <AiOutlineHome /> Home
          </a>
          <a className="sidebar-link">
            <SiYoutubeshorts /> Shorts
          </a>
          <a className="sidebar-link">
            <MdOutlineSubscriptions /> Subscriptions
          </a>
          <a className="sidebar-link">
            <IoLibraryOutline /> Library
          </a>
          <hr />
          {loggedInUser ? (
            <></>
          ) : (
            <div className="sidebar-section">
              <p>Sign in to like videos, comment, and subscribe also.</p>
              <button className="sidebar-sign-in-button" onClick={openModal}>
                <div className="SignIn">
                  <div className="SignIn_icon">
                    <FaRegUserCircle />
                  </div>{" "}
                  Sign In
                </div>
              </button>
            </div>
          )}
          <hr />
          <div className="sidebar-section">
            <h3>Explore</h3>
            <a className="sidebar-link">
              <BsFire /> Trending
            </a>
            <a className="sidebar-link">
              <HiOutlineShoppingBag /> Shopping
            </a>
            <a className="sidebar-link">
              <IoMusicalNotesOutline /> Music
            </a>
            <a className="sidebar-link">
              <BiMoviePlay /> Movies
            </a>
            <a className="sidebar-link">
              <RiLiveLine /> Live
            </a>
            <a className="sidebar-link">
              <IoGameControllerOutline /> Gaming
            </a>
          </div>
        </aside>

        {loading ? (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        ) : (
          <div className="main-content">
            <div className="categories">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="video-grid">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <VideoCard
                    loggedInUser={loggedInUser}
                    Allvideo={videos}
                    key={video._id}
                    video={video}
                    className="video-card"
                  />
                ))
              ) : !isModalOpen ? ( // Hide "no-results" only when the modal is open
                <div className="no-results">
                  <img src={nothing} alt="nothing" />
                  No results found. Search different words or remove search
                  filters.
                </div>
              ) : null}
            </div>
          </div>
        )}

        {/* Display modal independently */}
        {/* {isModalOpen && (
          <SignInPage
            isOpen={isModalOpen}
            onLogin={handleLogin}
            onClose={closeModal}
          />
        )} */}
      </div>
    </div>
  );
}

export default HomePage;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TutorialSideBar from "./TutorialSideBar";
import "./tutorial.css";
import cppContent from "../course_Content/cppContent";

const Tutorial = () => {
  const { tutorialName, topic } = useParams();
  const navigate = useNavigate();
  const [openSideBar, setOpenSideBar] = useState(true);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  // Find the current content object
  const currentIndex = cppContent.findIndex((item) => item.key === topic);
  const contentObject = cppContent[currentIndex];
  const content = contentObject ? contentObject.content : null;

  const handleNext = () => {
    if (currentIndex < cppContent.length - 1) {
      const nextTopic = cppContent[currentIndex + 1].key;
      navigate(`/tutorial/${tutorialName}/${nextTopic}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousTopic = cppContent[currentIndex - 1].key;
      navigate(`/tutorial/${tutorialName}/${previousTopic}`);
    }
  };

  return (
    <div className="tutorial-main-page">
      <div className="sidebar">
        <TutorialSideBar
          toggleSideBar={toggleSideBar}
          openSideBar={openSideBar}
        />
      </div>

      <div
        className={`tutorial-main-container ${
          openSideBar ? "open-tutorial" : ""
        }`}
      >
        {content ? <>{content}</> : <p>Content not available for "{topic}"</p>}

        <div className="tutorial-buttons">
          <button
            className={`previous-btn ${currentIndex === 0 ? "diable-btn" : ""}`}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className={`next-btn ${
              currentIndex === cppContent.length - 1 ? "diable-btn" : ""
            }`}
            onClick={handleNext}
            disabled={currentIndex === cppContent.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;

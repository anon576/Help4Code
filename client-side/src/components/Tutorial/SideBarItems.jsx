import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const SideBarItems = (props) => {
  const [openSubTopics, setOpenSubTopics] = useState(false);

  const toggleSubTopics = () => {
    setOpenSubTopics(!openSubTopics);
  };

  const { data } = props;

  return (
    <div className="tutorial-topic-container">
      <p className="tutorial-topics" onClick={toggleSubTopics}>
        <span>{data.topic}</span>
        <span
          className={`down-arrow ${openSubTopics ? "side-bar-up-arrow" : ""}`}
        >
          <FaAngleDown />
        </span>
      </p>
      <div
        className={`tutorial-subtopics-container ${
          openSubTopics ? "oper-subtopic-items" : ""
        }`}
      >
        {data?.subtopic?.map((subtopic, index) => (
          <p key={index} className="tutorial-subtopics">
            {subtopic}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SideBarItems;

import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";

const SideBarItems = (props) => {
  const [openSubTopics, setOpenSubTopics] = useState(false);

  const { tutorialName } = useParams();

  const toggleSubTopics = () => {
    setOpenSubTopics(!openSubTopics);
  };

  const { data } = props;

  const navigate = useNavigate();

  const openContent = (tn, st) => {
    navigate(`/tutorial/${tn}/${st}`);
  };

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
          <p
            className="tutorial-subtopics"
            key={index}
            onClick={() => openContent(tutorialName, subtopic)}
          >
            {/* <Link
              style={{ width: "100%", border: "1px solid red" }}
              key={index}
              to={`/tutorial/${tutorialName}/${subtopic}`}
            > */}
            {subtopic}
            {/* </Link> */}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SideBarItems;

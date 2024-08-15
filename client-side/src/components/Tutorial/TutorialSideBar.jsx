import React, { useEffect, useState } from "react";
import "./tutorialsidebar.css";
import { TbSquareToggle } from "react-icons/tb";
import SideBarItems from "./SideBarItems";
import cpp from "../../courses/cpp";
import { useParams } from "react-router-dom";

const TutorialSideBar = (props) => {
  const { toggleSideBar, openSideBar } = props;

  const { tutorialName } = useParams();

  return (
    <div
      className={`tutorial-sidebar-container ${
        openSideBar ? "open-sidebar" : ""
      }`}
    >
      <div className={`tutorial-sidebar-main-contianer`}>
        <div className="tutorial-sidebar-heading">
          <h2>{`${tutorialName} Course`}</h2>
        </div>

        {cpp.map((data, index) => (
          <SideBarItems key={index} data={data} />
        ))}
      </div>

      <div
        className={`toggle-button-container ${
          openSideBar ? "open-toggle-btn" : ""
        }`}
        onClick={toggleSideBar}
      >
        <TbSquareToggle />
      </div>
    </div>
  );
};

export default TutorialSideBar;

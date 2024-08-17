import React, { useEffect, useState } from "react";
import "./tutorialsidebar.css";
import { TbSquareToggle } from "react-icons/tb";
import SideBarItems from "./SideBarItems";
import cpp from "../../courses/cpp";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TutorialSideBar = (props) => {
  const { toggleSideBar, openSideBar } = props;

  const { tutorialName } = useParams();

  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    handleLoading();
  }, []);

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
        {cpp.map((data, index) =>
          loading ? (
            <Skeleton
              // count={2}
              style={{
                padding: "5px 0",
                margin: "5px 0",
                background: "#dee2e6",
              }}
            />
          ) : (
            <SideBarItems key={index} data={data} />
          )
        )}

        {/* <Skeleton
          // count={2}
          style={{
            padding: "5px 0",
            margin: "5px 0",
          }}
        /> */}
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

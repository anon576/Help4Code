import React, { useEffect, useState } from "react";
import featureImage from "../../images/feature-image.png";
import Review from "../Other/Review";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../style/homepage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../constant";

const Homepage = (props) => {
  const { setProgress } = props;

  useEffect(() => {
    setProgress(40);

    setTimeout(() => {
      setProgress(100);
    }, 200);
  }, [setProgress]);

  const notifySuccess = () =>
    toast.success("Wow so easy!", {
      position: "top-right",
    });

  const notifyError = () =>
    toast.error("Wow so easy!", {
      position: "top-right",
    });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses data from your server
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/public/get_course`); // Update with the correct endpoint
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="homepage">
      <section className="hero-header">
        <div className="hero-description">
          <h1>Help4Code</h1>
          <h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
            eius aperiam natus quasi dolores.
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
            dolorum architecto unde a corporis, neque cum optio laborum commodi
            debitis, perspiciatis molestiae dolore. Accusamus sed voluptatem,
            distinctio autem eius optio?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Obcaecati, ipsum!.
          </p>
          <div className="hero-buttons">
            <button className="button" onClick={notifyError}>
              Get Started
            </button>
            <button className="button" onClick={notifySuccess}>
              Watch the demo
            </button>
          </div>
        </div>
        <div className="hero-image"> </div>
      </section>

      <section className="home-services">
        <div className="home-services-content" id="homeTutorial">
          <div className="home-services-header">
            <h1>Free E-Learning Tutorials</h1>
          </div>

          <div className="home-services-cards">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.course_id} className="services-card-contain">
                  <img src={course.course_img || 'default-image-url'} alt={course.course_name} />
                  <div className="services-text">
                    <h2>{course.course_name}</h2>
                    <p>{course.course_introduction}</p>
                    <Link
                      to={`/tutorial/${course.course_name.split(" ")[0]}/main introduction`}
                    >
                      Start Learning...
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No tutorials available.</p>
            )}
          </div>
        </div>

        {/* <div className="features" id="homeProgram">
          <h3>
            <span>Practice Programs</span>
          </h3>
        </div>
        <div className="home-services-content">
          <div className="home-services-header">
            <h1>Programs</h1>
          </div>

          <div className="home-services-cards">
            {displayProgram.map((program) => (
              <div key={program.programID} className="services-card-contain">
                <img src={program.imgurl} alt={program.name} />
                <div className="services-text">
                  <h2>{program.name}</h2>
                  <p>{program.description}</p>
                  <Link to={`/program/${program.programID}`}>Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="features" id="homeServices">
          <h3>
            <span>Our Service</span>
          </h3>
        </div>
        <div className="home-services-content">
          <div className="home-services-header">
            <h1>Services</h1>
          </div>

          <div className="home-services-cards">
            {displayService.map((service) => (
              <div key={service.serviceID} className="services-card-contain">
                <img src={service.imgurl} alt={service.name} />
                <div className="services-text">
                  <h2>{service.name}</h2>
                  <p>{service.description}</p>
                  <Link to={`/service/${service.serviceID}`}>Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="features">
          <h3>
            <span>Features and Benefits</span>
          </h3>
          <div className="features-container">
            <div className="features-content">
              <h2>Features</h2>
              <li>Custom Web Development</li>
              <li>Innovative App Development</li>
              <li>Professional Training Programs</li>
              <li>Free Courses for Continued Learning</li>
            </div>

            <div className="features-content">
              <h2>Benefits</h2>
              <li>Enhanced Customer Engagement</li>
              <li>Increased Online Visibility</li>
              <li>Secure and Reliable Hosting</li>
              <li>Upgraded Digital Skills</li>
              <li>Long-Term Partnership with Trusted Experts</li>
            </div>

            <div className="feature-img">
              <img src={featureImage} alt="" />
            </div>
          </div>
        </div>
      </section>
      <Review />
      <ToastContainer />
    </div>
  );
};

export default Homepage;

import Header from "./components/Web Utils/Navbar";
import Footer from "./components/Web Utils/Footer";
import Homepage from "./components/Home/Homepage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Contact from "./components/Web Utils/Contact";
import Otp from "./components/Login/Otp";
import ServicesDetail from "./components/Service/ServicesDetail";
import Errorpage from "./components/Other/Errorpage";
import ScrollToTop from "./components/Other/ScrollToTop";
import Forgetpassword from "./components/Login/ForgetPassword";
import "./style/light-theme-colors.css";
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Services from "./components/Service/Services";
import About from "./components/Web Utils/About";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/Other/PrivateRoute";
import ApplyService from "./components/Service/ApplyService";
import ProfileNavbar from "./components/Profile/ProfileNavbar";
import EnrolledService from "./components/Service/EnrolledService";
import TrackService from "./components/Service/TrackService";
import InternshipPage from "./components/Other/InternshipPage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminNavBar from "./components/Admin/AdminNavBar";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPrivateRoute from "./components/Admin/AdminPrivateRoute";
import AdminServices from "./components/Admin/AdminServices";
import AdminServiceDetail from "./components/Admin/AdminServiceDetail";
import ServiceChanges from "./components/Service/ServiceChanges";
import { useHotkeys } from "react-hotkeys-hook";
import ActiveServices from "./components/Service/ActiveServices";
import Tutorial from "./components/Tutorial/Tutorial";
import AdminCourse from "./components/Admin/Course/Course";
import AdminChapterCourse from "./components/Admin/Course/CourseChapter";
import AddAdminCourseChappter from "./components/Admin/Course/AddCourseChapter";
import UpdateAdminCourseChappter from "./components/Admin/Course/UpdateCourseChapter";
import AdminTopicCourse from "./components/Admin/Course/Topics/AdminVeiwTopic";
import AddAdminTopic from "./components/Admin/Course/Topics/AddTopics";
import UpdateAdminTopic from "./components/Admin/Course/Topics/UpdateTopics";
// import RazorpayButton from "./components/RazorpayButton";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");

  // const [adminLogin, setAdminLogin] = useState()

  let [openLogin, setOpenlogin] = useState(false);

  let [progress, setProgress] = useState(0);

  useHotkeys("ctrl+alt+a", () => {
    window.location.href = "/admindashboard";
  });

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <LoadingBar color="#001d3d" progress={progress} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Homepage setProgress={setProgress} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                <Footer />
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                <Register setProgress={setProgress} trigger={setOpenlogin} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                {/* <Footer /> */}
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Contact setProgress={setProgress} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                <Footer />
              </>
            }
          />

          <Route
            path="/services"
            element={
              <>
                <Services setProgress={setProgress} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                <Footer />
              </>
            }
          />

          <Route
            path="/service/:serviceID"
            element={
              <>
                <ServicesDetail setProgress={setProgress} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <About setProgress={setProgress} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute
                navBar={Header}
                login={Login}
                footer={Footer}
                component={Profile}
                profileNavbar={ProfileNavbar}
                authenticated={isUserSignedIn}
                open={openLogin}
                trigger={setOpenlogin}
                setProgress={setProgress}
              />
            }
          />

          <Route
            path="/enrolledservices"
            element={
              <PrivateRoute
                navBar={Header}
                login={Login}
                footer={Footer}
                component={EnrolledService}
                profileNavbar={ProfileNavbar}
                authenticated={isUserSignedIn}
                open={openLogin}
                trigger={setOpenlogin}
                setProgress={setProgress}
              />
            }
          />

          <Route
            path="/trackservice/:serviceApplyID"
            element={
              <PrivateRoute
                navBar={Header}
                login={Login}
                footer={Footer}
                component={TrackService}
                profileNavbar={ProfileNavbar}
                authenticated={isUserSignedIn}
                open={openLogin}
                trigger={setOpenlogin}
                setProgress={setProgress}
              />
            }
          />

          <Route
            path="/applyservice/:serviceID"
            element={
              <PrivateRoute
                navBar={Header}
                login={Login}
                footer={Footer}
                component={ApplyService}
                authenticated={isUserSignedIn}
                open={openLogin}
                trigger={setOpenlogin}
                setProgress={setProgress}
              />
            }
          />

          <Route
            path="/tutoril/:tutorialName"
            element={
              <PrivateRoute
                navBar={Header}
                login={Login}
                footer={Footer}
                component={Tutorial}
                authenticated={isUserSignedIn}
                open={openLogin}
                trigger={setOpenlogin}
                setProgress={setProgress}
              />
            }
          />

          <Route
            path="/internship"
            element={
              <>
                <InternshipPage setProgress={setProgress} />
                <Header trigger={setOpenlogin} />
                <Login trigger={openLogin} close={setOpenlogin} />
                <Footer />
              </>
            }
          />

          {/* <Route path="/internship" element={<InternshipPage />} /> */}

          <Route
            path="/otp/:otptype"
            element={<Otp setProgress={setProgress} trigger={setOpenlogin} />}
          />

          <Route
            path="/forgetpassword"
            element={<Forgetpassword setProgress={setProgress} />}
          />

          <Route
            path="*"
            element={
              <Errorpage setProgress={setProgress} trigger={setOpenlogin} />
            }
          />

          <Route path="/adminlogin" element={<AdminLogin />} />

          <Route
            path="/admindashboard"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminDashboard}
              />
            }
          />

          <Route
            path="/adminusers"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminUsers}
              />
            }
          />

          <Route
            path="/adminservices"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminServices}
              />
            }
          />

          <Route
            path="/adminservicedetail/:serviceID"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminServiceDetail}
              />
            }
          />

          <Route
            path="/servicechanges/:serviceID/:changetype"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={ServiceChanges}
              />
            }
          />

          <Route
            path="/activeservices"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={ActiveServices}
              />
            }
          />

          <Route
            path="/admin_course"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminCourse}
              />
            }
          />

          <Route
            path="/adminchaptercourse"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminChapterCourse}
              />
            }
          />

          <Route
            path="/addadminchaptercourse"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AddAdminCourseChappter}
              />
            }
          />

          <Route
            path="/updateadminchaptercourse"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={UpdateAdminCourseChappter}
              />
            }
          />

          <Route
            path="/admintopic"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AdminTopicCourse}
              />
            }
          />

          <Route
            path="/addadmintopic"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={AddAdminTopic}
              />
            }
          />

<Route
            path="/updateadmintopic"
            element={
              <AdminPrivateRoute
                adminNavbar={AdminNavBar}
                component={UpdateAdminTopic}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

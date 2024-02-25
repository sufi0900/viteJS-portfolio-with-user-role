import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

import BlogsSection from "./BlogsSection";
import ProjectsSection from "./ProjectsSection";
import TestimonialsSection from "./Testimonial";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import DashbooardPortfolio from "./pages/DashboardPortfolio";
import ContactMe from "./ContactMe";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditProject from "./pages/AddEditProject";
import AddEditBlog from "./pages/AddEditTour";
// import PrivateRoute from "./pages/PrivateRoute";

import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { checkSession } from "./redux/features/authSlice";
import { useEffect } from "react";
import AddEditSkill from "./pages/AddEditSkill";
import AddEditPortfolio from "./pages/AddEditPortfolio";
import AddEditAbout from "./pages/AddEditAbout";
import AddEdittechnology from "./pages/AddEdittechnology";

import AddEditEducation from "./pages/AddEditEducation";
import AddEditServices from "./pages/AddEditServices";
import AddEditTestimonial from "./pages/AddEditTestimonial";
import BlogDetail from "./BlogDetail";
import ApprovalPage from "./pages/Approval";
function App() {
  const dispatch = useDispatch();
  // Dispatch checkSession action on app start or user interactions (e.g., onClick, useEffect)
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/editEducation/:id" element={<AddEditEducation />} />
          <Route path="/editServices/:id" element={<AddEditServices />} />
          <Route path="/editTestimonial/:id" element={<AddEditTestimonial />} />
          <Route path="/editSkill/:id" element={<AddEditSkill />} />
          <Route path="/editPortfolio/:id" element={<AddEditPortfolio />} />
          <Route path="/editPortfolio2/:id" element={<AddEdittechnology />} />
          <Route path="/editPortfolio3/:id" element={<AddEditAbout />} />
          <Route path="/editTour/:id" element={<AddEditBlog />} />
          <Route path="/approval" element={<ApprovalPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<BlogsSection />} />
          <Route path="/editPortfolio/:id" element={<AddEditPortfolio />} />
          <Route path="/addinfo" element={<DashbooardPortfolio />} />

          <Route path="/Tour/:id" element={<BlogDetail />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/test" element={<TestimonialsSection />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/editProject/:id" element={<AddEditProject />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

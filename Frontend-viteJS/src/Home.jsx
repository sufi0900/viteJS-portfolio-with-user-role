import HomePage from "./HomeCode";
import AboutMe from "./About";
import ServiceCard from "./Services";

import ContactMe from "./ContactMe";
import TestimonialsSection from "./Testimonial";
import ProjectsSection from "./ProjectsSection";
import BlogsSection from "./BlogsSection";
import Navbar from "./Navbar";
import SkillList from "./SkillList";
const Home = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
      <br />
      <br />

      <AboutMe />
      <br />
      <SkillList />
      <br />
      <ServiceCard />
      <br />
      <br />

      <ProjectsSection />
      <br />
      <br />
      <br />
      <TestimonialsSection />
      <br />
      <BlogsSection />
      <br />
      <ContactMe />
    </div>
  );
};

export default Home;

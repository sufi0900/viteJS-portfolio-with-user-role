import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("profile")?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const changeEmail = (formData) =>
  API.post("/users/changeEmail", formData);
export const changePassword = (formData) =>
  API.post("/users/changePassword", formData);

// Portfolio
export const createPortfolio = (PortfolioData) =>
  API.post("/Portfolio", PortfolioData);
export const getPortfolios = (page) => API.get(`/Portfolio?page=${page}`);
export const getPortfolio = (id) => API.get(`/Portfolio/${id}`);
export const deletePortfolio = (id) => API.delete(`/Portfolio/${id}`);
export const updatePortfolio = (updatedPortfolioData, id) =>
  API.patch(`/Portfolio/${id}`, updatedPortfolioData);
export const getPortfoliosByUser = (userId, page) =>
  API.get(`/Portfolio/userPortfolios/${userId}?page=${page}`);
export const getAllPortfolios = () => API.get("/Portfolio");
export const getPortfoliosBySearch = (searchQuery) =>
  API.get(`/Portfolio/search?searchQuery=${searchQuery}`);
// Blogs
export const createTour = (tourData) => API.post("/tour", tourData);
export const getTours = (page) => API.get(`/tour/pageTours?page=${page}`);

export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
export const getAllTours = () => API.get("/tour");
export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);

// project
export const createProject = (ProjectData) => API.post("/Project", ProjectData);
export const getProjects = (page) => API.get(`/Project?page=${page}`);
export const getProject = (id) => API.get(`/Project/${id}`);
export const deleteProject = (id) => API.delete(`/Project/${id}`);
export const updateProject = (updatedProjectData, id) =>
  API.patch(`/Project/${id}`, updatedProjectData);
export const getProjectsByUser = (userId, page) =>
  API.get(`/Project/userProjects/${userId}?page=${page}`);
export const getAllProjects = () => API.get("/project");
export const getProjectsBySearch = (searchQuery) =>
  API.get(`/Project/search?searchQuery=${searchQuery}`);

// home
export const createHome = (HomeData) => API.post("/Home", HomeData);
export const getHomes = (page) => API.get(`/Home?page=${page}`);
export const getHome = (id) => API.get(`/Home/${id}`);
export const deleteHome = (id) => API.delete(`/Home/${id}`);
export const updateHome = (updatedHomeData, id) =>
  API.patch(`/Home/${id}`, updatedHomeData);
export const getHomesByUser = (userId, page) =>
  API.get(`/Home/userHomes/${userId}?page=${page}`);
export const getAllHomes = () => API.get("/Home");
export const getHomesBySearch = (searchQuery) =>
  API.get(`/Home/search?searchQuery=${searchQuery}`);

// Skill
export const createSkill = (SkillData) => API.post("/Skill", SkillData);
export const getSkills = (page) => API.get(`/Skill?page=${page}`);
export const getSkill = (id) => API.get(`/Skill/${id}`);
export const deleteSkill = (id) => API.delete(`/Skill/${id}`);
export const updateSkill = (updatedSkillData, id) =>
  API.patch(`/Skill/${id}`, updatedSkillData);
export const getSkillsByUser = (userId, page) =>
  API.get(`/Skill/userSkills/${userId}?page=${page}`);
export const getAllSkills = () => API.get("/Skill");
export const getSkillsBySearch = (searchQuery) =>
  API.get(`/Skill/search?searchQuery=${searchQuery}`);

// Education
export const createEducation = (EducationData) =>
  API.post("/Education", EducationData);
export const getEducations = (page) => API.get(`/Education?page=${page}`);
export const getEducation = (id) => API.get(`/Education/${id}`);
export const deleteEducation = (id) => API.delete(`/Education/${id}`);
export const updateEducation = (updatedEducationData, id) =>
  API.patch(`/Education/${id}`, updatedEducationData);
export const getEducationsByUser = (userId, page) =>
  API.get(`/Education/userEducations/${userId}?page=${page}`);
export const getAllEducations = () => API.get("/Education");
export const getEducationsBySearch = (searchQuery) =>
  API.get(`/Education/search?searchQuery=${searchQuery}`);

// Services
export const createServices = (ServicesData) =>
  API.post("/Services", ServicesData);
export const getServicess = (page) => API.get(`/Services?page=${page}`);
export const getServices = (id) => API.get(`/Services/${id}`);
export const deleteServices = (id) => API.delete(`/Services/${id}`);
export const updateServices = (updatedServicesData, id) =>
  API.patch(`/Services/${id}`, updatedServicesData);
export const getServicessByUser = (userId, page) =>
  API.get(`/Services/userServicess/${userId}?page=${page}`);
export const getAllServicess = () => API.get("/Services");
export const getServicessBySearch = (searchQuery) =>
  API.get(`/Services/search?searchQuery=${searchQuery}`);

// Testimonial
export const createTestimonial = (TestimonialData) =>
  API.post("/Testimonial", TestimonialData);
export const getTestimonials = (page) => API.get(`/Testimonial?page=${page}`);
export const getTestimonial = (id) => API.get(`/Testimonial/${id}`);
export const deleteTestimonial = (id) => API.delete(`/Testimonial/${id}`);
export const updateTestimonial = (updatedTestimonialData, id) =>
  API.patch(`/Testimonial/${id}`, updatedTestimonialData);
export const getTestimonialsByUser = (userId, page) =>
  API.get(`/Testimonial/userTestimonials/${userId}?page=${page}`);
export const getAllTestimonials = () => API.get("/Testimonial");
export const getTestimonialsBySearch = (searchQuery) =>
  API.get(`/Testimonial/search?searchQuery=${searchQuery}`);

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import ProjectReducer from "./features/projectSlice";

import PortfolioReducer from "./features/portfolioSlice";
import SkillReducer from "./features/skillSlice";
import EducationReducer from "./features/educationSlice";
import ServicesReducer from "./features/servicesSlice";
import TestimonialReducer from "./features/testimonialSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    project: ProjectReducer,
    skill: SkillReducer,
    portfolio: PortfolioReducer,
    education: EducationReducer,
    services: ServicesReducer,
    testimonial: TestimonialReducer,
  },
});

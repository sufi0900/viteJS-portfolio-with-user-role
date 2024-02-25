import React, { lazy, Suspense } from "react";
import FiveGIcon from "@mui/icons-material/FiveG";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import MoreIcon from "@mui/icons-material/More";
import SecurityIcon from "@mui/icons-material/Security";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SchoolIcon from "@mui/icons-material/School";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import DashTech from "./DashTech";
import BuildIcon from "@mui/icons-material/Build";
// import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import TimelineIcon from "@mui/icons-material/Timeline";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import MailLockIcon from "@mui/icons-material/MailLock";

import { setLogout } from "../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";

import Login from "./Login";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddEditProject from "./AddEditProject";
import AddEditAbout from "./AddEditAbout";
import AddEdittechnology from "./AddEdittechnology";
import AddEditBlog from "./AddEditTour";
import ChangeEmail from "./UpdateEmailForm";
import ChangePassword from "./UpdatePasswordForm";
import TaskIcon from "@mui/icons-material/Task";
import theme from "../theme";
import Spin from "../Spin";
import AddEditSkill from "./AddEditSkill";
import DashboardSkill from "./DashboardSkill";
import DashboardPortfolio from "./DashboardPortfolio";
import DashEducation from "./DashEducation";
import DashServices from "./DashServices";
import DashTestimonial from "./DashTestimonial";
import DashAbout from "./DashAbout";
import AddEditPortfolio from "./AddEditPortfolio";
import AddEditEducation from "./AddEditEducation";
import AddEditServices from "./AddEditServices";
import AddEditTestimonial from "./AddEditTestimonial";
import { Home } from "@mui/icons-material";
const MemoizedDashboardProject = lazy(() => import("./DashboardProject"));
const MemoizedDashboardBlog = lazy(() => import("./DashboardBlog"));
const drawerWidth = 240;
import * as api from "../redux/api";

import {
  getPortfolios,
  getPortfoliosByUser,
} from "../redux/features/portfolioSlice";
function AdminRoutes(props) {
  const { user, isLoading } = useSelector((state) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Store token in local storage after successful login
  if (user && user.token) {
    localStorage.setItem("token", user.token);
  }

  // Retrieve token from local storage after refresh
  const token = localStorage.getItem("token");

  if (!isLoading && token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
  const userId = user?.result?._id;
  const { userPortfolios } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const { currentPage } = useSelector((state) => ({
    ...state.project,
  }));
  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getPortfolios(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  useEffect(() => {
    preloadNextPageData(currentPage);
  }, [currentPage]);

  // Access the first item directly
  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getPortfolios(currentPage));
    preloadNextPageData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  const preloadNextPageData = async (currentPage) => {
    const nextPage = currentPage + 1;
    try {
      await api.getPortfolios(nextPage);
      // You can choose to store or use the preloaded data if needed
    } catch (error) {
      // Handle error
    }
  };
  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.clear(); // Clear the token from local storage
    navigate("/login");
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (!user?.result?._id) {
    navigate("/login");
    <Login />;
  }

  if (isLoading) {
    // User data is being fetched, show loading indicator or placeholder content
    return <div>Loading...</div>;
  }
  const firstPortfolio = userPortfolios[0];

  if (!user?.result?._id) {
    // User is not logged in, redirect to login
    navigate("/login");
    // return <Admin />;
  }

  const handleUpdatePasswordClick = () => {
    navigate("changePassword");
  };

  const handleUpdateEmailClick = () => {
    navigate("changeEmail");
  };

  const handleProjectClick = () => {
    navigate("addProject");
  };
  const handleSkillClick = () => {
    navigate("addSkill");
  };
  const handlePortfolioClick = () => {
    navigate("addPortfolio");
  };
  const handleAboutClick = () => {
    navigate("addAbout");
  };
  const handleEducationClick = () => {
    navigate("addEducation");
  };
  const handleServicesClick = () => {
    navigate("addServices");
  };
  const handleTeachnologyClick = () => {
    navigate("addTeachnology");
  };
  const handleTestimonialClick = () => {
    navigate("addTestimonial");
  };

  const handleBlogClick = () => {
    navigate("addBlog");
  };

  const handleEditProjectClick = () => {
    navigate("dashboardProject");
  };
  const handleEditPortfolioClick = () => {
    navigate("dashboardPortfolio");
  };
  const handleEditEducationClick = () => {
    navigate("dashboardEducation");
  };
  const handleEditTeachnologyClick = () => {
    navigate("dashboardTeachnology");
  };
  const handleEditAboutClick = () => {
    navigate("dashboardAbout");
  };
  const handleEditServicesClick = () => {
    navigate("dashboardServices");
  };
  const handleEditTestimonialClick = () => {
    navigate("dashboardTestimonial");
  };
  const handleEditSkillClick = () => {
    navigate("dashboardSkill");
  };

  const handleEditBlogClick = () => {
    navigate("dashboardBlog");
  };
  const handleLogin = () => {
    navigate("login");
  };
  const handleNavigate = () => {
    navigate("/");
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <ThemeProvider theme={theme}>
      <div>
        <Toolbar />
        <Divider />
        <List style={{ overflow: "auto" }}>
          <div className="flex">
            {" "}
            <h1>Add Info </h1>
            <AddIcon style={{ color: "#ff014f", fontSize: "50px" }} />
          </div>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add your Portfolio info"
                onClick={handlePortfolioClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <FiveGIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add Tech"
                onClick={handleTeachnologyClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add AboutPage Info"
                onClick={handleAboutClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary={" Add Education & Experience"}
                onClick={handleEducationClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <ConstructionIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add Skill"
                onClick={handleSkillClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <BuildIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add Services"
                onClick={handleServicesClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <TaskIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add Project"
                onClick={handleProjectClick}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <FormatQuoteIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add Testimonial"
                onClick={handleTestimonialClick}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <AddReactionIcon />
              </ListItemIcon>
              <ListItemText
                className="listitemtextadmin"
                primary="Add Blogs"
                onClick={handleBlogClick}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <br />
        <Divider style={{ background: "black", height: "3px" }} />
        <br />
        <div className="flex">
          <div>
            <h1>Update </h1> or
            <h2>Delete</h2>
            <ModeEditIcon style={{ color: "#ff014f", fontSize: "50px" }} />
          </div>
        </div>

        <List style={{ overflow: "auto" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <AccountBoxIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Portfolio"
                onClick={handleEditPortfolioClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <FiveGIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Tech"
                onClick={handleEditTeachnologyClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <PersonAddIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Aboutpage Info"
                onClick={handleEditAboutClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <SchoolIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Education & Experience"
                onClick={handleEditEducationClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <ConstructionIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Skill"
                onClick={handleEditSkillClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <BuildIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Services"
                onClick={handleEditServicesClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <TimelineIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Project"
                onClick={handleEditProjectClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <FormatQuoteIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Testimonial"
                onClick={handleEditTestimonialClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <AddReactionIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Edit Blogs"
                onClick={handleEditBlogClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <br />
          <Divider style={{ background: "black", height: "3px" }} />
          <br />
          <div className="flex">
            <h1>Personal info </h1>
            <SecurityIcon style={{ color: "#ff014f", fontSize: "50px" }} />
          </div>

          <br />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <EnhancedEncryptionIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Update Password"
                onClick={handleUpdatePasswordClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <MailLockIcon />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Update Email"
                onClick={handleUpdateEmailClick}
              />
              <ModeEditIcon className="listitemtextadmin" />
            </ListItemButton>
          </ListItem>
          <br />
          <Divider style={{ background: "black", height: "3px" }} />
          <br />
          <div className="flex">
            <h1>Other </h1>
            <MoreIcon style={{ color: "#ff014f", fontSize: "50px" }} />{" "}
          </div>
          <br />
          {!user?.result?._id && ( // Render "Login" item only when not logged in
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className="listitemtextadmin">
                  <LoginIcon />
                </ListItemIcon>

                <ListItemText
                  className="listitemtextadmin"
                  primary="Login"
                  onClick={handleLogin}
                />
                <ModeEditIcon className="listitemtextadmin" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="listitemtextadmin">
                <Home />
              </ListItemIcon>

              <ListItemText
                className="listitemtextadmin"
                primary="Go Home"
                onClick={handleNavigate}
              />
            </ListItemButton>
          </ListItem>
          {user?.result?._id && (
            <ListItem disablePadding>
              <ListItemButton style={{ cursor: "pointer" }}>
                <ListItemIcon className="listitemtextadmin">
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  className="listitemtextadmin"
                  primary="Logout"
                  onClick={handleLogout}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </div>
    </ThemeProvider>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
          className="bgColorAdminNavbar"
        >
          {/* <ToastContainer /> */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex">
              <div>
                <h1>
                  {" "}
                  <AdminPanelSettingsIcon
                    style={{ color: "", fontSize: "57px" }}
                  />{" "}
                  Admin Dashboard{" "}
                </h1>
              </div>
            </div>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className="drawerBackground" // Apply the class here
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: "#e2e8ec",
                zIndex: "1222",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <div>
            {" "}
            <button>
              <ListItem className="">
                <ListItemAvatar className="">
                  <Avatar
                    style={{
                      background: "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "50px", // Adjust the width as needed
                      height: "50px", // Maintain a square aspect
                    }}
                    data-aos="zoom-in-down"
                  >
                    <img
                      className="i-swing"
                      src={firstPortfolio && firstPortfolio.imageFile2}
                      alt=""
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={<h1>{user?.result?.name}</h1>}
                  secondary={
                    <p style={{ fontWeight: "lighter" }}>
                      {user?.result?.email}
                    </p>
                  }
                  data-aos="zoom-in"
                  className="ListItemTextSkill"
                />
              </ListItem>
            </button>
            <br />
          </div>{" "}
          <br />
          <Routes>
            <Route path="addBlog" element={<AddEditBlog />} />
            <Route path="addSkill" element={<AddEditSkill />} />
            <Route path="addportfolio" element={<AddEditPortfolio />} />
            <Route path="addProject" element={<AddEditProject />} />
            <Route path="addTeachnology" element={<AddEdittechnology />} />
            <Route path="addEducation" element={<AddEditEducation />} />
            <Route path="addServices" element={<AddEditServices />} />
            <Route path="addTestimonial" element={<AddEditTestimonial />} />
            <Route path="addAbout" element={<AddEditAbout />} />

            <Route path="dashboardBlog" element={<LazyLoadedDashboardBlog />} />
            <Route path="dashboardSkill" element={<DashboardSkill />} />
            <Route path="dashboardTeachnology" element={<DashTech />} />
            <Route path="dashboardEducation" element={<DashEducation />} />
            <Route path="dashboardServices" element={<DashServices />} />
            <Route path="dashboardTestimonial" element={<DashTestimonial />} />
            <Route path="dashboardPortfolio" element={<DashboardPortfolio />} />
            <Route path="dashboardAbout" element={<DashAbout />} />

            <Route
              path="dashboardProject"
              element={<LazyLoadedDashboardProject />}
            />

            <Route path="changeEmail" element={<ChangeEmail />} />
            <Route path="changePassword" element={<ChangePassword />} />

            <Route path="login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

AdminRoutes.propTypes = {
  window: PropTypes.func,
};

function LazyLoadedDashboardBlog() {
  return (
    <Suspense
      fallback={
        <div style={{ marginTop: "75px" }}>
          <Spin />
        </div>
      }
    >
      <MemoizedDashboardBlog />
    </Suspense>
  );
}
function LazyLoadedDashboardProject() {
  return (
    <Suspense
      fallback={
        <div style={{ marginTop: "75px" }}>
          <Spin />
        </div>
      }
    >
      <MemoizedDashboardProject />
    </Suspense>
  );
}
export default AdminRoutes;

/* eslint-disable react/jsx-key */
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Grid";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, getProjectsByUser } from "./redux/features/projectSlice";
import { useEffect } from "react";
import Spin from "./Spin";
import Card from "react-bootstrap/Card";

import { GitHub, OpenInNew } from "@mui/icons-material";
import * as api from "./redux/api"; // Import your API functions

const ProjectsSection = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { currentPage } = useSelector((state) => ({
    ...state.project,
  }));

  const { userProjects, loading } = useSelector((state) => ({
    ...state.project,
  }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getProjectsByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);

  const preloadNextPageData = async (currentPage) => {
    const nextPage = currentPage + 1;
    try {
      await api.getProjects(nextPage); // Use your actual API function
      // You can choose to store or use the preloaded data if needed
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    dispatch(getProjects(currentPage));
    preloadNextPageData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  if (loading) {
    return <Spin />;
  }
  return (
    <Grid
      container
      spacing={2}
      padding={2}
      className="mt-5 flex testimonial"
      id="projects"
    >
      <br />
      <br />
      <div className="ToPHeading">
        <h1>Portfolio</h1>
        <h2>My Amazing Works</h2>
        <p>
          Most common methods for designing websites that work well on desktop
          is responsive and adaptive design
        </p>
      </div>
      {userProjects.length > 0 ? (
        ""
      ) : (
        <>
          <Grid
            item
            lg={4}
            sm={12}
            xl={4}
            md={6}
            xs={12}
            padding={2}
            className="flex"
          >
            {" "}
            <Card
              className="projectCard img-container"
              data-aos="zoom-out"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{
                padding: "10px",
                overflow: "hidden",
                height: "auto",
              }}
            >
              <h1
                style={{
                  background: "#ff014f",
                  borderRadius: "10px",
                  color: "white",
                  padding: "5px",
                }}
              >
                [title of project]
              </h1>
              <br />
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://www.sliderrevolution.com/wp-content/uploads/2021/09/onehd.png"
                />
              </div>

              <div className="btn-group ">
                <Card.Link href="" target="GitHub" className="btn  m-1">
                  {" "}
                  <GitHub />{" "}
                </Card.Link>
                <Card.Link href="" target="OpenInNew" className="btn  m-1">
                  <OpenInNew />
                </Card.Link>
              </div>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={12}
            xl={4}
            md={6}
            xs={12}
            padding={2}
            className="flex"
          >
            <Card
              className="projectCard img-container"
              data-aos="zoom-out"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{
                padding: "10px",
                overflow: "hidden",
                height: "auto",
              }}
            >
              <h1
                style={{
                  background: "#ff014f",
                  borderRadius: "10px",
                  color: "white",
                  padding: "5px",
                }}
              >
                [title of project]
              </h1>
              <br />
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://149842033.v2.pressablecdn.com/wp-content/uploads/2019/03/free-one-page-website-templates-1000x750.jpg"
                />
              </div>

              <div className="btn-group ">
                <Card.Link href="" target="GitHub" className="btn  m-1">
                  {" "}
                  <GitHub />{" "}
                </Card.Link>
                <Card.Link href="" target="OpenInNew" className="btn  m-1">
                  <OpenInNew />
                </Card.Link>
              </div>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={12}
            xl={4}
            md={6}
            xs={12}
            padding={2}
            className="flex"
          >
            <Card
              className="projectCard img-container"
              data-aos="zoom-out"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{
                padding: "10px",
                overflow: "hidden",
                height: "auto",
              }}
            >
              <h1
                style={{
                  background: "#ff014f",
                  borderRadius: "10px",
                  color: "white",
                  padding: "5px",
                }}
              >
                [title of project]
              </h1>
              <br />
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVMfhbX7fPH2QICDRW-xT305Vw-ahXz4_PGQ&usqp=CAU"
                />
              </div>

              <div className="btn-group ">
                <Card.Link href="" target="GitHub" className="btn  m-1">
                  {" "}
                  <GitHub />{" "}
                </Card.Link>
                <Card.Link href="" target="OpenInNew" className="btn  m-1">
                  <OpenInNew />
                </Card.Link>
              </div>
            </Card>
          </Grid>
          <Grid
            item
            lg={4}
            sm={12}
            xl={4}
            md={6}
            xs={12}
            padding={2}
            className="flex"
          >
            <Card
              className="projectCard img-container"
              data-aos="zoom-out"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{
                padding: "10px",
                overflow: "hidden",
                height: "auto",
              }}
            >
              <h1
                style={{
                  background: "#ff014f",
                  borderRadius: "10px",
                  color: "white",
                  padding: "5px",
                }}
              >
                [title of project]
              </h1>
              <br />
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <Card.Img
                  variant="top"
                  src="https://i0.wp.com/htmlcodex.com/wp-content/uploads/2021/07/startup-website-template.jpg?fit=740%2C463&ssl=1"
                />
              </div>

              <div className="btn-group ">
                <Card.Link href="" target="GitHub" className="btn  m-1">
                  {" "}
                  <GitHub />{" "}
                </Card.Link>
                <Card.Link href="" target="OpenInNew" className="btn  m-1">
                  <OpenInNew />
                </Card.Link>
              </div>
            </Card>
          </Grid>
        </>
      )}
      {userProjects.length > 0 ? (
        <>
          {userProjects &&
            userProjects.map((item) => (
              <Suspense
                fallback={
                  <div style={{ marginTop: "75px" }}>
                    <Spin />
                  </div>
                }
              >
                <ProjectCard key={item._id} {...item} />
              </Suspense>
            ))}
        </>
      ) : null}
    </Grid>
  );
};

export default ProjectsSection;

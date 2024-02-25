/* eslint-disable react/no-unescaped-entities */
// AboutMe.js

import CustomizedTimeline from "./Timeline";
import Grid from "@mui/material/Grid";

import { Paper } from "@mui/material";
import ListAboutMe from "./ListAboutMe";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getPortfoliosByUser } from "./redux/features/portfolioSlice";
import Spin from "./Spin";
import Resume from "./Resume";
const AboutMe = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { userPortfolios, loading } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId));
    }
  }, [dispatch, userId]);

  // Access the first item directly
  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Spin />;
  }
  const firstPortfolio = userPortfolios[0];
  return (
    <div id="about">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          md={6}
          xl={6}
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="400"
        >
          <div className="aboutgrid flex">
            {" "}
            <div className="svgabout-img">
              <div className="image-area" data-aos="fade">
                <div className="img-wrapper">
                  {" "}
                  <img
                    src={
                      firstPortfolio?.aboutimg ||
                      "https://img.freepik.com/free-photo/man-white_1368-3544.jpg"
                    }
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                  <h2>
                    {firstPortfolio && firstPortfolio.fullnameabout}{" "}
                    {(!user?.result || userPortfolios.length === 0) && (
                      <span>[Your Name]</span>
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-duration="400"
          data-aos-du
          item
          xs={12}
          sm={12}
          lg={6}
          md={6}
          xl={6}
          className="ToPHeading"
        >
          <div className=" aboutme p-4 ">
            <br />
            <br />
            <h1>About Me</h1>
            <h2> Who am i and how i got here: </h2>
            <p style={{ textAlign: "start" }}>
              {firstPortfolio && firstPortfolio.aboutinfo}
              {(!user?.result || userPortfolios.length === 0) && (
                <>
                  [short info about you] <br /> Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Accusamus asperiores eum
                  voluptas in a enim odit, laudantium sunt natus, sed laboriosam
                  quasi eligendi dolorem placeat illo dignissimos unde suscipit
                  maiores.{" "}
                </>
              )}
            </p>
            <ListAboutMe
              // Pass relevant data as props to ListAboutMe
              fullname={firstPortfolio && firstPortfolio.fullnameabout}
              age={firstPortfolio && firstPortfolio.age}
              dob={firstPortfolio && firstPortfolio.dob}
              religion={firstPortfolio && firstPortfolio.religion}
              intrest={firstPortfolio && firstPortfolio.intrest}
              experience={firstPortfolio && firstPortfolio.experience}
              phoneabout={firstPortfolio && firstPortfolio.phoneabout}
              emailabout={firstPortfolio && firstPortfolio.emailabout}
              country={firstPortfolio && firstPortfolio.country}
              language={firstPortfolio && firstPortfolio.language}
              hobby={firstPortfolio && firstPortfolio.hobby}
            />
            <br />

            <Resume resume={firstPortfolio && firstPortfolio.resume} />
          </div>
        </Grid>
      </Grid>
      <br />
      <Grid container item>
        <Grid item xs={12} sm={12} lg={12} md={12} xl={12}>
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 4, background: "#e2e8ec" }}
          >
            <CustomizedTimeline />
          </Paper>
        </Grid>
      </Grid>
      <br />
    </div>
  );
};

export default AboutMe;

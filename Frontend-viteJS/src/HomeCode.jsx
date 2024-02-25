/* eslint-disable react/jsx-key */
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import Grid from "@mui/material/Grid";
import ReactRotatingText from "react-rotating-text";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { getPortfoliosByUser } from "./redux/features/portfolioSlice";
import Spin from "./Spin";
import { Helmet } from "react-helmet";

const Home = () => {
  AOS.init();
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
  const technologyArray = userPortfolios.map((item) => item.technology);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mern Stack Portfolio</title>
        <meta
          name="description"
          content="Welcome to My Full MERN Stack website. This platform is
          meticulously designed and fully functional. To unlock the
          complete experience, simply log in or create an account by
          clicking on the user icon. Once logged in, just add your
          portfolio information. Your curated content will then be
          displayed on this beautiful portfolio website, showcasing
          your professional journey and expertise."
        />
        <link rel="canonical" href="https://sufianmustafa.com/" />
      </Helmet>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          marginTop: "10px",
          padding: "10px",
        }}
        className=""
        id="home"
      >
        <div
          style={{}}
          data-aos="zoom-in"
          className=" home p-6 Home-background-svg  Portfolio flex justify-center items-center text-center "
        >
          <div className=" overflow-hidden">
            <h1 data-aos="zoom-in">
              Hi, I am &nbsp;
              <span
                style={{ color: "#ff014f", textShadow: "1px 1px 1px black" }}
              >
                {user?.result && userPortfolios.length > 0 && (
                  <span
                    style={{
                      color: "#ff014f",
                      textShadow: "1px 1px 1px black",
                    }}
                  >
                    {firstPortfolio && firstPortfolio.fullname}
                  </span>
                )}

                {(!user?.result || userPortfolios.length === 0) && (
                  <span>[Your Name],</span>
                )}
              </span>
              &nbsp; a
              <br />
              <span
                style={{ color: "#ff014f", textShadow: "1px 1px 1px black" }}
              >
                {/* {userPortfolios &&
                    userPortfolios.map((item) => (
                      <list>
                        {" "}
                        <li>{item.jobtitle}</li>{" "}
                      </list>
                    ))} */}
                {firstPortfolio && firstPortfolio.jobtitle}
                {(!user?.result || userPortfolios.length === 0) && (
                  <span>[Job title],</span>
                )}
              </span>{" "}
            </h1>

            <p>
              {firstPortfolio && firstPortfolio.homeinfo}
              {(!user?.result || userPortfolios.length === 0) && (
                <>
                  <span data-aos="zoom-in" data-aos-delay="300">
                    <br />
                    Welcome to My Full MERN Stack website. This platform is
                    meticulously designed and fully functional. To unlock the
                    complete experience, simply log in or create an account by
                    clicking on the user icon. Once logged in, just add your
                    portfolio information. Your curated content will then be
                    displayed on this beautiful portfolio website, showcasing
                    your professional journey and expertise.
                  </span>
                  <a href="https://sufianmustafa.com">
                    <h1
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                      }}
                    >
                      MyWebSIteLink
                    </h1>
                  </a>
                </>
              )}
            </p>
            <div className="overflow-hidden ">
              <h2>
                Some of the technologies i recently used are:
                <br />
                <span
                  style={{
                    overflow: "hidden",
                    color: "#ff014f",
                    textShadow: "1px 1px 1px black",
                  }}
                >
                  {technologyArray.length > 0 ? (
                    <ReactRotatingText items={technologyArray} />
                  ) : (
                    <ReactRotatingText
                      items={[
                        " Welcome  ",
                        " [Add Your Technologies]  ",
                        " [Your Technologies will]  ",
                        " [Display here]  ",
                        " [just add Technologies]  ",
                        " ReactJs  ",
                        " NextJS (ReactJS)",

                        " AOS (animate on scroll) ",

                        " Animate.css",

                        " FramerMotion",
                      ]}
                    />
                  )}
                </span>
              </h2>
            </div>
            <div className="mt-4 flex justify-center   ">
              <a
                href={firstPortfolio && firstPortfolio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 Social_Icon"
              >
                <GitHubIcon />
              </a>
              <a
                href={firstPortfolio && firstPortfolio.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 Social_Icon"
              >
                <TwitterIcon />
              </a>
              <a
                href={firstPortfolio && firstPortfolio.facebook}
                target="_blank"
                rel="noopener noreferrer "
                className="Social_Icon"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default Home;

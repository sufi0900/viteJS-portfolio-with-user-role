import { Email, GitHub, Phone } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import IconButton from "@mui/material/IconButton";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import { getPortfoliosByUser } from "./redux/features/portfolioSlice";
import Spin from "./Spin";

const ContactMe = () => {
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
    <div>
      <Container
        sx={{ marginTop: "40px" }}
        className="contactbox "
        id="contact"
      >
        <Grid container spacing={1} padding={1} className="flex ">
          <div className=" flex ToPHeading">
            <div>
              <br />
              <br />
              <br />
              <h1
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="400"
              >
                {" "}
                <ContactMailIcon
                  style={{ color: "#ff014f", fontSize: "120px" }}
                />{" "}
              </h1>
              <h1
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="400"
              >
                Contact Me
              </h1>
              <h2
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="400"
                style={{ fontSize: "33px", fontWeight: "bold" }}
              >
                I Want To Hear From You
              </h2>
              <p
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="400"
              >
                Feel free to reach out to me for any inquiries or just to say
                hello.
              </p>
            </div>
          </div>

          <Grid item xs={12} md={6} className="">
            <p
              data-aos="zoom-in-up"
              data-aos-delay="200"
              data-aos-duration="400"
            >
              {" "}
              <Email style={{ color: "#ff014f", fontSize: "57px" }} />
              <br />
              <h2
                data-aos="zoom-in-up"
                data-aos-delay="200"
                data-aos-duration="400"
              >
                Email
              </h2>
              {firstPortfolio && firstPortfolio.email}
              {(!user?.result || userPortfolios.length === 0) && (
                <span>YourEmail@gmail.com</span>
              )}
            </p>
            <br /> <br />
            <p
              data-aos="zoom-in-up"
              data-aos-delay="200"
              data-aos-duration="400"
            >
              {" "}
              <Phone style={{ color: "#ff014f", fontSize: "57px" }} /> <br />
              <h2>Phone No#</h2> {firstPortfolio && firstPortfolio.phone}
              {(!user?.result || userPortfolios.length === 0) && (
                <span>+92 012345652</span>
              )}
            </p>
            <br /> <br />
            <p
              data-aos="zoom-in-down"
              data-aos-delay="200"
              data-aos-duration="400"
            >
              {" "}
              <LocationOnIcon
                style={{ color: "#ff014f", fontSize: "57px" }}
              />{" "}
              <br />
              <h2>Address</h2> {firstPortfolio && firstPortfolio.address}
              {(!user?.result || userPortfolios.length === 0) && (
                <span>New York City</span>
              )}
            </p>
            <br />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    variant="outlined"
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    variant="outlined"
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    sx={{ background: "#ff014f" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid> */}
        </Grid>
      </Container>
      <br />
      <footer
        style={{
          backgroundColor: "white",
          padding: "120px 0",
          borderRadius: "10px",
        }}
      >
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {/* Social Icons */}
            <Grid item>
              <IconButton
                href={`${firstPortfolio && firstPortfolio.facebook}`}
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                href={`${firstPortfolio && firstPortfolio.twitter}`}
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                href={`${firstPortfolio && firstPortfolio.github}`}
                color="inherit"
              >
                <GitHub />
              </IconButton>
            </Grid>

            {/* Copyright Claim */}
            <Grid item xs={12}>
              <p>
                © {new Date().getFullYear()} All rights reserved. <br /> Website
                designed and developed by{" "}
                <a href="https://sufianmustafa.com">
                  {" "}
                  <span style={{ textDecoration: "underline", color: "blue" }}>
                    {" "}
                    Sufian Mustafa{" "}
                  </span>
                </a>
              </p>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
};

export default ContactMe;

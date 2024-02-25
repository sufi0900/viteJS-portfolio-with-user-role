/* eslint-disable react/jsx-key */
import CardContent from "@mui/material/CardContent";

import CodeIcon from "@mui/icons-material/Code"; // You can replace this with any other icon
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import {
  getServicess,
  getServicessByUser,
} from "./redux/features/ServicesSlice";
import Spin from "./Spin";
const ServiceCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { userServicess, loading } = useSelector((state) => ({
    ...state.services,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getServicessByUser(userId));
    }
  }, [dispatch, userId]);

  // Access the first item directly
  useEffect(() => {
    if (userId) {
      dispatch(getServicessByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Spin />;
  }
  return (
    <Grid container className="testimonial  " id="services">
      <div className="ToPHeading">
        <br />
        <br />
        <br />
        <h1> Services </h1>
        <h2>What I Do for Clients</h2>
        <p>
          Most common methods for designing websites that work well on desktop
          is responsive and adaptive design
        </p>
      </div>
      <Grid container spacing={2} padding={2} flex className=" flex  ">
        {userServicess.length > 0 ? (
          ""
        ) : (
          <>
            <div
              className="serviceCard"
              data-aos="zoom-out-up"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{ maxWidth: 300, textAlign: "center" }}
            >
              <div className="slide">
                <CardContent>
                  <button
                    color="primary"
                    className="serviceCardicon "
                    // style={{ background: "#ff014f", color: "white" }}
                  >
                    <CodeIcon />
                  </button>
                  <h1 className="mt-2"> [title of service] </h1>
                  <p className="mt-1">
                    [description of service] Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Beatae debitis animi, unde
                    sunt
                  </p>
                </CardContent>
              </div>
            </div>
            <div
              className="serviceCard"
              data-aos="zoom-out-up"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{ maxWidth: 300, textAlign: "center" }}
            >
              <div className="slide">
                <CardContent>
                  <button
                    color="primary"
                    className="serviceCardicon "
                    // style={{ background: "#ff014f", color: "white" }}
                  >
                    <CodeIcon />
                  </button>
                  <h1 className="mt-2"> [title of service] </h1>
                  <p className="mt-1">
                    [description of service] Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Beatae debitis animi, unde
                    sunt
                  </p>
                </CardContent>
              </div>
            </div>
            <div
              className="serviceCard"
              data-aos="zoom-out-up"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{ maxWidth: 300, textAlign: "center" }}
            >
              <div className="slide">
                <CardContent>
                  <button
                    color="primary"
                    className="serviceCardicon "
                    // style={{ background: "#ff014f", color: "white" }}
                  >
                    <CodeIcon />
                  </button>
                  <h1 className="mt-2"> [title of service] </h1>
                  <p className="mt-1">
                    [description of service] Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Beatae debitis animi, unde
                    sunt
                  </p>
                </CardContent>
              </div>
            </div>
            <div
              className="serviceCard"
              data-aos="zoom-out-up"
              data-aos-delay="200"
              data-aos-duration="400"
              style={{ maxWidth: 300, textAlign: "center" }}
            >
              <div className="slide">
                <CardContent>
                  <button
                    color="primary"
                    className="serviceCardicon "
                    // style={{ background: "#ff014f", color: "white" }}
                  >
                    <CodeIcon />
                  </button>
                  <h1 className="mt-2"> [title of service] </h1>
                  <p className="mt-1">
                    [description of service] Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Beatae debitis animi, unde
                    sunt
                  </p>
                </CardContent>
              </div>
            </div>
          </>
        )}
        {userServicess.length > 0 ? (
          <>
            {userServicess &&
              userServicess.map((item) => (
                <div
                  className="serviceCard"
                  data-aos="zoom-out-up"
                  data-aos-delay="200"
                  data-aos-duration="400"
                  style={{ maxWidth: 300, textAlign: "center" }}
                >
                  <div className="slide">
                    <CardContent>
                      <button
                        color="primary"
                        className="serviceCardicon "
                        // style={{ background: "#ff014f", color: "white" }}
                      >
                        <CodeIcon />
                      </button>
                      <h1 className="mt-2"> {item.title} </h1>
                      <p className="mt-1">{item.description}</p>
                    </CardContent>
                  </div>
                </div>
              ))}
          </>
        ) : null}
      </Grid>{" "}
    </Grid>
  );
};

export default ServiceCard;

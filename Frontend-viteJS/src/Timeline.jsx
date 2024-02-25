/* eslint-disable react/jsx-key */

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Grid from "@mui/material/Grid";

import { Download, School, Star, Work } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import { getEducationsByUser } from "./redux/features/educationSlice";
import Spin from "./Spin";
import Resume from "./Resume";
export default function CustomizedTimeline() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { userEducations, loading } = useSelector((state) => ({
    ...state.education,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getEducationsByUser(userId));
    }
  }, [dispatch, userId]);

  const preloadNextPageData = async (currentPage) => {
    const nextPage = currentPage + 1;
    try {
      await api.getEducations(nextPage);
      // You can choose to store or use the preloaded data if needed
    } catch (error) {
      // Handle error
    }
  };

  // Access the first item directly
  useEffect(() => {
    if (userId) {
      dispatch(getEducationsByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Spin />;
  }
  return (
    <Grid container className="svgtimeline  flex ">
      <div className="ToPHeading">
        {" "}
        <h1> Education and Experience </h1>
      </div>

      <VerticalTimeline>
        <style>
          {`
      .vertical-timeline::before {
        background-color: #ff014f; 

     
      }
    `}
        </style>

        {userEducations.length > 0 ? (
          ""
        ) : (
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2011 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<Work />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2011 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<Work />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date="2011 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<Work />}
            >
              <h3 className="vertical-timeline-element-title">
                Creative Director
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
              <p>
                Creative Direction, User Experience, Visual Design, Project
                Management, Team Leading
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2008 - 2010"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<Work />}
            >
              <h3 className="vertical-timeline-element-title">Web Designer</h3>
              <h4 className="vertical-timeline-element-subtitle">
                Los Angeles, CA
              </h4>
              <p>User Experience, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2006 - 2008"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<Work />}
            >
              <h3 className="vertical-timeline-element-title">Web Designer</h3>
              <h4 className="vertical-timeline-element-subtitle">
                San Francisco, CA
              </h4>
              <p>User Experience, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="April 2013"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<School />}
            >
              <h3 className="vertical-timeline-element-title">
                Content Marketing for Web, Mobile and Social Media
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Online Course
              </h4>
              <p>Strategy, Social Media</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="November 2012"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<School />}
            >
              <h3 className="vertical-timeline-element-title">
                Agile Development Scrum Master
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Certification
              </h4>
              <p>Creative Direction, User Experience, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2002 - 2006"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={<School />}
            >
              <h3 className="vertical-timeline-element-title">
                Bachelor of Science in Interactive Digital Media Visual Imaging
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Bachelor Degree
              </h4>
              <p>Creative Direction, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
              icon={<Star />}
            />
          </VerticalTimeline>
        )}

        {userEducations.length > 0 ? (
          <>
            <Grid spacing={2} padding={2}>
              {/* <VerticalTimeline> */}
              {userEducations &&
                userEducations.map((item) => (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work "
                    contentStyle={{
                      color: "black",
                      background: "#e2e8ec",
                      borderRadius: "15px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                    }}
                    contentArrowStyle={{
                      borderRight: "15px solid  red",
                    }}
                    date={`${item.years}`}
                    iconStyle={{
                      background: "#e2e8ec",
                      color: "#ff014f",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                    }}
                    icon={<School />}
                  >
                    <div className="overflow-auto ">
                      <h1 className="vertical-timeline-element-title  ">
                        {item.title}
                      </h1>
                      <h2 className="vertical-timeline-element-subtitle">
                        {" "}
                        {item.university}{" "}
                      </h2>
                      <p> {item.description} </p>
                    </div>
                  </VerticalTimelineElement>
                ))}
              {/* </VerticalTimeline> */}
            </Grid>
          </>
        ) : null}

        <VerticalTimelineElement
          iconStyle={{
            background: "#ff014f",
            color: "#fff",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
          }}
          icon={<Download />}
        />
      </VerticalTimeline>
      <div className="flex">
        <Resume />
      </div>
    </Grid>
  );
}

/* eslint-disable react/no-unescaped-entities */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getSkills, getSkillsByUser } from "./redux/features/skillSlice";
import Spin from "./Spin";

export default function SkillList() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const { userSkills, loading } = useSelector((state) => ({
    ...state.skill,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getSkillsByUser(userId));
    }
  }, [dispatch, userId]);

  // Access the first item directly
  useEffect(() => {
    if (userId) {
      dispatch(getSkillsByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Spin />;
  }

  const progress = {
    width: "100%",
    marginRight: "15px",
    height: "15px",
  };

  return (
    <Grid container item className=" ToPHeading " id="skills">
      <>
        <style type="text/css">
          {`   

.progress-bar{  background-color:  #ff014f ; 
  font-size:17px;
  border-radius: 10px;
  height: 15px;
color:black; }
.progress{
    height: 10px;
  background-color: #ffffff;
}


}

`}
        </style>
      </>
      <Grid
        item
        xs={12}
        sm={12}
        lg={12}
        md={12}
        xl={12}
        padding={2}
        className="skillsvg"
      >
        <br />
        <br />
        <br />
        <h1>Skills</h1>
        {userSkills.length > 0 ? (
          ""
        ) : (
          <List>
            <ListItem className="flex">
              <ListItemAvatar>
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
                    src="https://www.etnmagazine.eu/wp-content/uploads/2021/07/batsheba200500003.jpeg"
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ProgressBar
                animated
                now={70}
                className="SkillList"
                style={progress}
                label={<span className="progress-label-color">{70}</span>}
                data-aos="zoom-in-right"
              />
              <ListItemText
                primary="[your skill title here]"
                data-aos="zoom-in"
                className="ListItemTextSkill"
              />
            </ListItem>
            <ListItem className="flex">
              <ListItemAvatar>
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
                    src="https://www.etnmagazine.eu/wp-content/uploads/2021/07/batsheba200500003.jpeg"
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ProgressBar
                animated
                now={50}
                className="SkillList"
                style={progress}
                label={<span className="progress-label-color">{50}</span>}
                data-aos="zoom-in-right"
              />
              <ListItemText
                primary="[your skill title here]"
                data-aos="zoom-in"
                className="ListItemTextSkill"
              />
            </ListItem>
            <ListItem className="flex">
              <ListItemAvatar>
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
                    src="https://www.etnmagazine.eu/wp-content/uploads/2021/07/batsheba200500003.jpeg"
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ProgressBar
                animated
                now={89}
                className="SkillList"
                style={progress}
                label={<span className="progress-label-color">{89}</span>}
                data-aos="zoom-in-right"
              />
              <ListItemText
                primary="[your skill title here]"
                data-aos="zoom-in"
                className="ListItemTextSkill"
              />
            </ListItem>
            <ListItem className="flex">
              <ListItemAvatar>
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
                    src="https://www.etnmagazine.eu/wp-content/uploads/2021/07/batsheba200500003.jpeg"
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ProgressBar
                animated
                now={60}
                className="SkillList"
                style={progress}
                label={<span className="progress-label-color">{60}</span>}
                data-aos="zoom-in-right"
              />
              <ListItemText
                primary="[your skill title here]"
                data-aos="zoom-in"
                className="ListItemTextSkill"
              />
            </ListItem>
          </List>
        )}

        {userSkills.length > 0 ? (
          <List className=" text-center ">
            {userSkills &&
              userSkills.map((item) => (
                <ListItem key={item._id} className="flex">
                  <ListItemAvatar>
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
                        src={item.imageFile}
                        alt=""
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ProgressBar
                    animated
                    now={item.percentage}
                    className="SkillList"
                    style={progress}
                    label={
                      <span className="progress-label-color">{`${item.percentage}%`}</span>
                    }
                    data-aos="zoom-in-right"
                  />
                  <ListItemText
                    primary={item.title}
                    data-aos="zoom-in"
                    className="ListItemTextSkill"
                  />
                </ListItem>
              ))}
          </List>
        ) : null}
      </Grid>
    </Grid>
  );
}

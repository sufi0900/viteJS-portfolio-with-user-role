/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { InsertEmoticon, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import {
  getPortfolios,
  getPortfoliosByUser,
} from "./redux/features/portfolioSlice";
import Spin from "./Spin";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCard({ title, description, imageFile2, _id }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { currentPage } = useSelector((state) => ({
    ...state.project,
  }));

  const { userPortfolios, loading } = useSelector((state) => ({
    ...state.portfolio,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getPortfoliosByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getPortfolios(currentPage));
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
  if (loading) {
    return <Spin />;
  }
  const firstPortfolio = userPortfolios[0];

  return (
    <Link to={`/tour/${_id}`}>
      <Card
        data-aos="zoom-out-right"
        data-aos-delay="200"
        data-aos-duration="400"
        className="blogCard"
        style={{
          margin: "10px",
          background: "#ff014f",
          borderRadius: "15px",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ",
        }}
      >
        <CardHeader
          style={{ overflow: "auto" }}
          avatar={
            <Avatar sx={{ bgcolor: "#e2e8ec" }} aria-label="recipe">
              <Person style={{ color: "#ff014f" }} />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" style={{ color: "white" }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <p style={{ color: "white" }}>
              {" "}
              {firstPortfolio && firstPortfolio.fullname}
            </p>
          }
          // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageFile2}
          alt="Paella dish"
        />
        <CardContent>
          <p>{title}</p>

          {/* <p style={{ color: "white" }}>{description}</p> */}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            style={{ color: "#e2e8ec" }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" style={{ color: "#e2e8ec" }}>
            <ShareIcon />
          </IconButton>
          <ExpandMore aria-label="show more">
            <ExpandMoreIcon style={{ color: "#e2e8ec" }} />
          </ExpandMore>
        </CardActions>
        <Collapse timeout="auto" unmountOnExit>
          <CardContent>
            <h1 style={{ color: "#e2e8ec", lineHeight: "40px" }}>
              Method stirring occasionally until lightly
            </h1>

            <p style={{ color: "#e2e8ec" }}>{description}</p>
          </CardContent>
        </Collapse>
      </Card>
    </Link>
  );
}

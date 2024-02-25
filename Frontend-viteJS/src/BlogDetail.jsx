import { useEffect, useState } from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";

import { getTour, clearTour } from "./redux/features/tourSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spin from "./Spin";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    dispatch(clearTour());

    // Simulate loading delay
    const delay = 1500; // 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, [dispatch, id]);

  // Function to generate a random number between 1 and 100 for demonstration purposes
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

  // Function to get the first 10 words of the blog description
  const getFirst10Words = (description) => {
    const words = description.split(" ");
    return words.slice(0, 10).join(" ");
  };
  return (
    <Grid
      container
      justifyContent="center"
      className=""
      style={{ margin: "20px 0" }}
    >
      <Grid
        item
        lg={8}
        md={10}
        sm={12}
        xs={12}
        className="blogContainer"
        style={{ marginTop: "10px", overflow: "hidden" }}
      >
        {/* User Avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {/* <IconButton>
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="caption" style={{ marginRight: "10px" }}>
            {generateRandomNumber()} Users
          </Typography> */}
        </div>

        {/* Static icons with random numbers */}
        <button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <ListItem>
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
                  src="https://i.pinimg.com/564x/73/c3/50/73c35097071e55014cffc83b72f85ea3.jpg"
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary=""
              data-aos="zoom-in"
              className="ListItemTextSkill"
            />
          </ListItem>
        </button>
        {isLoading ? (
          <Spin />
        ) : (
          <div>
            <Typography
              variant="h3"
              data-aos="zoom-in"
              style={{ textAlign: "start", margin: "10px" }}
            >
              {tour.title}
            </Typography>

            {/* Displaying the first 10 words of the blog description */}
            {/* <Typography variant="body1" style={{ textAlign: "center" }}>
              {getFirst10Words(tour.description)}
            </Typography> */}

            <div className="flex">
              {" "}
              <img
                src={tour.imageFile2}
                alt="Img"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <br />
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <IconButton>
                  <AccountCircleIcon />
                </IconButton>
                <Typography variant="caption" style={{ marginRight: "10px" }}>
                  {generateRandomNumber()} Users
                </Typography>

                <IconButton>
                  <CommentIcon />
                </IconButton>
                <Typography variant="caption" style={{ marginRight: "10px" }}>
                  {generateRandomNumber()} Comments
                </Typography>

                <IconButton>
                  <ShareIcon />
                </IconButton>
                <Typography variant="caption">
                  {generateRandomNumber()} Shares
                </Typography>
              </div>
            </div>
            <div
              className="QuillDescription"
              data-aos="zoom-in"
              data-aos-delay="500"
              style={{ margin: "20px 0" }}
            >
              <div className="QuillDescription flex">
                {/* Displaying the rest of the blog description */}
                <p dangerouslySetInnerHTML={{ __html: tour.description }} />
              </div>
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default BlogDetail;

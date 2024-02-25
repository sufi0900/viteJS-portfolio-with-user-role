/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import BlogCard from "./BlogCard";
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
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import { getTours, getToursByUser } from "./redux/features/tourSlice";
import Spin from "./Spin";
import { ExpandMore, Person } from "@mui/icons-material";

function BlogsSection() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { currentPage } = useSelector((state) => ({
    ...state.project,
  }));

  const { userTours, loading } = useSelector((state) => ({
    ...state.tour,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getTours(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  const preloadNextPageData = async (currentPage) => {
    const nextPage = currentPage + 1;
    try {
      await api.getTours(nextPage);
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
      dispatch(getToursByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getTours(currentPage));
    preloadNextPageData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  if (loading) {
    return <Spin />;
  }
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <Grid
      container
      spacing={2}
      padding={2}
      className="mt-5 flex Tour"
      id="blogs"
    >
      <div className="ToPHeading">
        <br />
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>Latest Blog</h1>
        <h2 style={{ textAlign: "center" }}>
          Our Recent Updates, Blog, Tips, Tricks & More
        </h2>
        <br />
      </div>

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          Autoplay,
          Mousewheel,
          Keyboard,
        ]}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        autoplay={false}
        navigation={true}
        keyboard
        slidesPerView={3}
        pagination={pagination}
        className="mySwiper"
      >
        {userTours && userTours.length >= 3 ? (
          <>
            {userTours &&
              userTours.map((item) => (
                <SwiperSlide>
                  <BlogCard key={item} {...item} />
                </SwiperSlide>
              ))}
          </>
        ) : (
          <>
            <p style={{ textAlign: "center" }}> </p>
            Add three blogs to show your blogs here.
            <>
              <SwiperSlide>
                <Card
                  className="blogCard"
                  data-aos="zoom-out-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
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
                      <IconButton
                        aria-label="settings"
                        style={{ color: "white" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<p style={{ color: "white" }}> [your name here]</p>}
                    // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://wallpapers.com/images/hd/blogging-backdrop-8ifwoxtwf7mdg268.jpg"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <p> [Blog title] </p>

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

                      {/* <p style={{ color: "#e2e8ec" }}>{description}</p> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  className="blogCard"
                  data-aos="zoom-out-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
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
                      <IconButton
                        aria-label="settings"
                        style={{ color: "white" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<p style={{ color: "white" }}> [your name here]</p>}
                    // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
                  />
                  {/* <CardMedia
                  component="img"
                  height="194"
                  image="https://thumbs.dreamstime.com/z/blogging-blog-word-coder-coding-using-laptop-page-keyboard-notebook-blogger-internet-computer-marketing-opinion-interface-layout-80864637.jpg"
                  alt="Paella dish"
                /> */}
                  <h1 style={{ color: "white" }}>
                    {" "}
                    Kindly contribute a minimum of three blog posts to showcase
                    your work on this platform
                  </h1>
                  <CardContent>
                    <p> [Blog title] </p>

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

                      {/* <p style={{ color: "#e2e8ec" }}>{description}</p> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  className="blogCard"
                  data-aos="zoom-out-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
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
                      <IconButton
                        aria-label="settings"
                        style={{ color: "white" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<p style={{ color: "white" }}> [your name here]</p>}
                    // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="data:image/jpeg;base64,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"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <p> [Blog title] </p>

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

                      {/* <p style={{ color: "#e2e8ec" }}>{description}</p> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </SwiperSlide>

              <SwiperSlide>
                <Card
                  className="blogCard"
                  data-aos="zoom-out-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
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
                      <IconButton
                        aria-label="settings"
                        style={{ color: "white" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<p style={{ color: "white" }}> [your name here]</p>}
                    // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
                  />
                  {/* <CardMedia
                    component="img"
                    height="194"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW3biuxlMTkKhQ1SQmppu9Eq7HI1ysfi0-yaFsIiTvar8d04nizZpSGmnGSnnZlE8Eh68&usqp=CAU"
                    alt="Paella dish"
                  /> */}
                  <CardContent>
                    <p> [Blog title] </p>
                    <h1 style={{ color: "white" }}>
                      {" "}
                      Let's fill this space with your amazing blogs! Add three
                      to display.{" "}
                    </h1>
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

                      {/* <p style={{ color: "#e2e8ec" }}>{description}</p> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  className="blogCard"
                  data-aos="zoom-out-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
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
                      <IconButton
                        aria-label="settings"
                        style={{ color: "white" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<p style={{ color: "white" }}> [your name here]</p>}
                    // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://thumbs.dreamstime.com/z/blogging-blog-word-coder-coding-using-laptop-page-keyboard-notebook-blogger-internet-computer-marketing-opinion-interface-layout-80864637.jpg"
                    alt="Paella dish"
                  />
                  <h1 style={{ color: "white" }}>
                    {" "}
                    Add at least three blogs to display here
                  </h1>
                  <CardContent>
                    <p> [Blog title] </p>

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

                      {/* <p style={{ color: "#e2e8ec" }}>{description}</p> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </SwiperSlide>
              <SwiperSlide>
                <Card
                  className="blogCard"
                  data-aos="zoom-out-right"
                  data-aos-delay="200"
                  data-aos-duration="400"
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
                      <IconButton
                        aria-label="settings"
                        style={{ color: "white" }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={<p style={{ color: "white" }}> [your name here]</p>}
                    // subheader={<span style={{ color: "white" }}>September 14, 2016</span>}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://wallpapers.com/images/hd/blogging-backdrop-8ifwoxtwf7mdg268.jpg"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <p> [Blog title] </p>

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

                      {/* <p style={{ color: "#e2e8ec" }}>{description}</p> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </SwiperSlide>
              {/* </Swiper> */}
            </>
          </>
        )}
        <br />
        <br />
      </Swiper>
    </Grid>
  );
}

export default BlogsSection;

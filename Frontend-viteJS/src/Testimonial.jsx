/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */

import Grid from "@mui/material/Grid";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

import { EffectCreative } from "swiper/modules";
import "swiper/css/effect-creative";

import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import "swiper/css/virtual";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import * as api from "./redux/api";
import { useEffect } from "react";
import {
  getTestimonials,
  getTestimonialsByUser,
} from "./redux/features/testimonialSlice";
import Spin from "./Spin";
const Testimonialsection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { currentPage } = useSelector((state) => ({
    ...state.project,
  }));

  const { userTestimonials, loading } = useSelector((state) => ({
    ...state.testimonial,
  }));
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getTestimonialsByUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getTestimonials(currentPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  const preloadNextPageData = async (currentPage) => {
    const nextPage = currentPage + 1;
    try {
      await api.getTestimonials(nextPage);
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
      dispatch(getTestimonialsByUser(userId)); // Pass the currentPage here
    }
  }, [dispatch, userId]);
  useEffect(() => {
    dispatch(getTestimonials(currentPage));
    preloadNextPageData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);
  if (loading) {
    return <Spin />;
  }
  const generateStars = () => {
    const starsArray = Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        style={{
          fontSize: "34px",
          color: "#ff014f",
          margin: "2px",
          borderRadius: "20px",
          background: "white",
        }}
        color="warning"
      />
    ));
    return starsArray;
  };

  return (
    <Grid
      container
      spacing={3}
      padding={2}
      flex
      style={{ zIndex: "2" }}
      className="testimonial flex svgtestimonial "
    >
      <div className="ToPHeading ">
        <h1> Testimonials</h1>
        <h2
          style={{
            textAlign: "center",
          }}
          className="m-2"
        >
          {" "}
          What My Clients Say{" "}
        </h2>
      </div>
      <p
        style={{
          color: "black",
          backgroundColor: "#e2e8ec",
          zIndex: "1",
          position: "relative",

          borderRadius: "10px",
        }}
        className="testimonialp"
      >
        Welcome to our Client Testimonials section, where the success stories of
        our clients come to life. At [Your Company Name], we take immense pride
        in delivering top-notch Testimonials and creating memorable experiences
        for those we serve. But don't just take our word for it—explore the
        genuine feedback from our satisfied clients.
      </p>

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          Autoplay,
          Mousewheel,
          Keyboard,
          EffectCreative,
        ]}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-140%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["140%", 0, -500],
          },
        }}
        pagination={{ clickable: true }}
        navigation={true}
        keyboard
        scrollbar={true}
        autoplay={{ delay: 5000 }}
        className="mySwiper"
      >
        {userTestimonials.length > 0 ? (
          ""
        ) : (
          <>
            <SwiperSlide>
              <Grid
                container
                lg={12}
                sm={12}
                xl={12}
                md={12}
                xs={12}
                padding={1}
                direction="column"
                alignItems="center"
              >
                {/* <Grid item xs={6}> */}
                <div
                  className="flex ToPHeading testimonialavatar"
                  style={{ position: "relative" }}
                >
                  <Avatar
                    src="https://w7.pngwing.com/pngs/39/144/png-transparent-portrait-face-richard-gadoury-realtor%C2%AE-comox-valley-real-estate-headshot-face-photography-necktie.png"
                    alt="avatar"
                    sx={{
                      border: "2px solid #ff014f",
                      width: "8rem",
                      height: "8rem",
                    }}
                  />
                </div>
                <h1
                  className="mt-4 testimonialtitle"
                  style={{
                    fontSize: "38px",
                    position: "relative",
                  }}
                >
                  john
                </h1>
                <div
                  className="testimonialdesc"
                  style={{ position: "relative" }}
                >
                  <p
                    className="mt-2"
                    style={{
                      backgroundColor: "#e2e8ec",
                      borderRadius: "10px",
                    }}
                  >
                    <FormatQuoteIcon
                      style={{
                        color: "#ff014f",
                        fontSize: "62px",
                      }}
                    />{" "}
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti aspernatur, cum adipisci laborum suscipit alias
                    iure consequatur quia perspiciatis esse quae. Modi nostrum
                    quidem totam non necessitatibus. Quos, rem quod.
                  </p>

                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    marginTop="1rem"
                    marginBottom={9}
                  >
                    {generateStars()}
                    {/* </Grid> */}
                  </Grid>
                </div>
                <div className="testimonialbottom"></div>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid
                container
                lg={12}
                sm={12}
                xl={12}
                md={12}
                xs={12}
                padding={1}
                direction="column"
                alignItems="center"
              >
                {/* <Grid item xs={6}> */}
                <div
                  className="flex ToPHeading testimonialavatar"
                  style={{ position: "relative" }}
                >
                  <Avatar
                    src="https://e7.pngegg.com/pngimages/867/654/png-clipart-marketing-sales-letter-business-headshot-business-affiliate-marketing-thumbnail.png"
                    alt="avatar"
                    sx={{
                      border: "2px solid #ff014f",
                      width: "8rem",
                      height: "8rem",
                    }}
                  />
                </div>
                <h1
                  className="mt-4 testimonialtitle"
                  style={{
                    fontSize: "38px",
                    position: "relative",
                  }}
                >
                  john
                </h1>
                <div
                  className="testimonialdesc"
                  style={{ position: "relative" }}
                >
                  <p
                    className="mt-2"
                    style={{
                      backgroundColor: "#e2e8ec",
                      borderRadius: "10px",
                    }}
                  >
                    <FormatQuoteIcon
                      style={{
                        color: "#ff014f",
                        fontSize: "62px",
                      }}
                    />{" "}
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti aspernatur, cum adipisci laborum suscipit alias
                    iure consequatur quia perspiciatis esse quae. Modi nostrum
                    quidem totam non necessitatibus. Quos, rem quod.
                  </p>

                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    marginTop="1rem"
                    marginBottom={9}
                  >
                    {generateStars()}
                    {/* </Grid> */}
                  </Grid>
                </div>
                <div className="testimonialbottom"></div>
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid
                container
                lg={12}
                sm={12}
                xl={12}
                md={12}
                xs={12}
                padding={1}
                direction="column"
                alignItems="center"
              >
                {/* <Grid item xs={6}> */}
                <div
                  className="flex ToPHeading testimonialavatar"
                  style={{ position: "relative" }}
                >
                  <Avatar
                    src="https://e7.pngegg.com/pngimages/288/86/png-clipart-steven-furtick-elevation-church-pastor-android-tshirt-pastor.png"
                    alt="avatar"
                    sx={{
                      border: "2px solid #ff014f",
                      width: "8rem",
                      height: "8rem",
                    }}
                  />
                </div>
                <h1
                  className="mt-4 testimonialtitle"
                  style={{
                    fontSize: "38px",
                    position: "relative",
                  }}
                >
                  john
                </h1>
                <div
                  className="testimonialdesc"
                  style={{ position: "relative" }}
                >
                  <p
                    className="mt-2"
                    style={{
                      backgroundColor: "#e2e8ec",
                      borderRadius: "10px",
                    }}
                  >
                    <FormatQuoteIcon
                      style={{
                        color: "#ff014f",
                        fontSize: "62px",
                      }}
                    />{" "}
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti aspernatur, cum adipisci laborum suscipit alias
                    iure consequatur quia perspiciatis esse quae. Modi nostrum
                    quidem totam non necessitatibus. Quos, rem quod.
                  </p>

                  <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    marginTop="1rem"
                    marginBottom={9}
                  >
                    {generateStars()}
                    {/* </Grid> */}
                  </Grid>
                </div>
                <div className="testimonialbottom"></div>
              </Grid>
            </SwiperSlide>
          </>
        )}
        {userTestimonials.length > 0 ? (
          <>
            {userTestimonials &&
              userTestimonials.map((item) => (
                <SwiperSlide>
                  <Grid
                    container
                    lg={12}
                    sm={12}
                    xl={12}
                    md={12}
                    xs={12}
                    padding={1}
                    direction="column"
                    alignItems="center"
                  >
                    {/* <Grid item xs={6}> */}
                    <div
                      className="flex ToPHeading testimonialavatar"
                      style={{ position: "relative" }}
                    >
                      <Avatar
                        src={item.imageFile}
                        alt="avatar"
                        sx={{
                          border: "2px solid #ff014f",
                          width: "8rem",
                          height: "8rem",
                        }}
                      />
                    </div>
                    <h1
                      className="mt-4 testimonialtitle"
                      style={{
                        fontSize: "38px",
                        position: "relative",
                      }}
                    >
                      {item.title}
                    </h1>
                    <div
                      className="testimonialdesc"
                      style={{ position: "relative" }}
                    >
                      <p
                        className="mt-2"
                        style={{
                          backgroundColor: "#e2e8ec",
                          borderRadius: "10px",
                        }}
                      >
                        <FormatQuoteIcon
                          style={{
                            color: "#ff014f",
                            fontSize: "62px",
                          }}
                        />{" "}
                        <br />
                        {item.description}
                      </p>

                      <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        marginTop="1rem"
                        marginBottom={9}
                      >
                        {generateStars()}
                        {/* </Grid> */}
                      </Grid>
                    </div>
                    <div className="testimonialbottom"></div>
                  </Grid>
                </SwiperSlide>
              ))}
          </>
        ) : null}
      </Swiper>
    </Grid>
  );
};

export default Testimonialsection;

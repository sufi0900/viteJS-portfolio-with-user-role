import Grid from "@mui/material/Grid";

import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
function TestimonialCard({ title }) {
  // Function to generate an array of 5 stars
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
        className="flex ToPHeading"
        style={{ position: "relative", top: "120px" }}
      >
        <Avatar
          src="https://res.cloudinary.com/dtvtphhsc/image/upload/v1700062346/w1dyscvxakuj5qkh3vor.jpg"
          alt="avatar"
          sx={{
            border: "2px solid #ff014f",
            width: "5rem",
            height: "5rem",
          }}
        />
      </div>
      <h1
        className="mt-4"
        style={{ fontSize: "38px", position: "relative", top: "120px" }}
      >
        {/* {title} */}
      </h1>
      <div style={{ position: "relative", top: "260px" }}>
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
          <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem
          ipsum dolor sit amet, consectetur adipiscing elit
        </p>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          marginTop="1rem"
        >
          {generateStars()}
          {/* </Grid> */}
        </Grid>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Grid>
  );
}

export default TestimonialCard;

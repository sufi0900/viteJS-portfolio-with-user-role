import React from "react";
import { Container, Typography, Button } from "@mui/material";

const ApprovalPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Your account requires approval.
      </Typography>
      <Typography variant="body1" paragraph>
        Please wait for admin approval to access the dashboard.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back to Home
      </Button>
    </Container>
  );
};

export default ApprovalPage;

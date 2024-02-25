/* eslint-disable react/no-unescaped-entities */
import Card from "react-bootstrap/Card";

import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { GitHub, OpenInNew } from "@mui/icons-material";
import { useState } from "react";

function HomeBackend({ title }) {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();

  // Use state to store the user's ID
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  // Conditional rendering to only show content to the user who created the project

  return <span> {title} </span>;
}

export default HomeBackend;

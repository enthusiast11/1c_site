import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useGetExcelQuery } from "./store/rtk-query/excel";

const Main = () => {
  const { data, error, isLoading } = useGetExcelQuery({});

  return (
    <Container sx={{ width: "50%" }}>
      <Typography> {data && JSON.stringify(data, null, 2)}</Typography>
    </Container>
  );
};

export default Main;

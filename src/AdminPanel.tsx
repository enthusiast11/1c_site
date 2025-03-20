import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { clearAdminState } from "./store/admin"; // написать
import { useNavigate } from "react-router";
import {
  BottomNavigation,
  Box,
  Button,
  Container,
  TextField,
} from "@mui/material";

const AdminPanel = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearAdminState());
  }, [dispatch]);

  const [isEdit, setIsEdit] = useState<true | false>(true);
  const [url] = useState<string>("https//test.ru");

  return (
    <Container>
      <Box>
        <TextField
          variant="filled"
          value={url}
          disabled={isEdit}
          id="url_main"
        ></TextField>
        <Button variant="contained" onClick={() => setIsEdit(!isEdit)}>
          Редактировать
        </Button>
      </Box>
      <BottomNavigation>
        <Button variant="contained" size="small">
          Сохранить
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/main")}
        >
          Главная страница
        </Button>
      </BottomNavigation>
    </Container>
  );
};

export default AdminPanel;

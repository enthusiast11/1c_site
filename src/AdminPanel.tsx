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
import NavBar from "./NavBar";

const AdminPanel = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearAdminState());
  }, [dispatch]);

  const [isEdit, setIsEdit] = useState<true | false>(true);
  const [url] = useState<string>("https//test.ru");
  const saveChanges = () => {
    console.log("Изменения сохранены");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",

          padding: "20px",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <TextField
            variant="filled"
            value={url}
            disabled={!isEdit}
            id="url_main"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => setIsEdit(!isEdit)}
            sx={{
              flexShrink: 0,
            }}
          >
            {isEdit ? "Отменить редактирование" : "Редактировать"}
          </Button>
        </Box>

        <BottomNavigation
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,

            padding: "10px 24px 10px 278px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" size="small" onClick={saveChanges}>
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
    </Box>
  );
};

export default AdminPanel;

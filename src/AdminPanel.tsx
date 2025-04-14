import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminState, updateUrl } from "./store/admin";
import { useNavigate } from "react-router";
import {
  BottomNavigation,
  Box,
  Button,
  Container,
  TextField,
} from "@mui/material";
import NavBar from "./NavBar";
import { RootState } from "./store"; // Убедитесь, что у вас есть тип RootState

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { url } = useSelector((state: RootState) => state.admin);
  const [localUrl, setLocalUrl] = useState(url);
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    dispatch(clearAdminState());
  }, [dispatch]);

  useEffect(() => {
    setLocalUrl(url);
  }, [url]);

  const saveChanges = () => {
    dispatch(updateUrl(localUrl));
    console.log("Изменения сохранены");
  };

  const handleCancel = () => {
    setLocalUrl(url);
    setIsEdit(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
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
            value={localUrl}
            onChange={(e) => setLocalUrl(e.target.value)}
            disabled={!isEdit}
            id="url_main"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={() => (isEdit ? handleCancel() : setIsEdit(true))}
            sx={{ flexShrink: 0 }}
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
            padding: "10px 24px 10px 10vw",
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

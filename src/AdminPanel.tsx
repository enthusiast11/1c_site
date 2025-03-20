import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { updateAdminState, clearAdminState } from "./store/admin"; // написать
import { useNavigate } from "react-router";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { admLogin, admPass, repeatPass } = useSelector(
    (state: RootState) => state.admin
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearAdminState());
  }, [dispatch]);

  const [isEdit, setIsEdit] = useState<true | false>(true);
  const [url, setUrl] = useState<string>("https//test.ru");
  const saveChanges = () => {
    console.log();
  };

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

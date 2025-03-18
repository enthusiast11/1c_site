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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { updateAdminState, clearAdminState } from "./store/admin"; // написать

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { admLogin, admPass, repeatPass } = useSelector(
    (state: RootState) => state.admin
  );
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
        <Button onClick={() => setIsEdit(!isEdit)}>Редактировать</Button>
      </Box>
      <Button onClick={saveChanges}>Cохранить</Button>
    </Container>
  );
};

export default AdminPanel;

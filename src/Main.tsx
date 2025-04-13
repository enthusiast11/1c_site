import React, { useState } from "react";
import { useSaveSheetMutation } from "./store/rtk-query/sendSheet";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import {
  Box,
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
} from "@mui/material";
import NavBar from "./NavBar";

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

const Main = () => {
  const [editableData, setEditableData] = useState<
    Array<Array<string | number>>
  >([]);
  const [isEdit, setIsEdit] = useState(false);

  const [saveSheet] = useSaveSheetMutation();

  const formatExcelDate = (serial: number): string => {
    const excelEpoch = new Date(1899, 11, 30);
    const days = Math.floor(serial);
    const date = new Date(excelEpoch.getTime() + days * 86400000);
    return date.toLocaleDateString("ru-RU");
  };

  const isTimeValue = (value: string | number): boolean => {
    return typeof value === "string" && !!value.match(/^\d{1,2}:\d{2}$/);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: Array<Array<string | number>> = XLSX.utils.sheet_to_json(
        worksheet,
        { header: 1 }
      );

      const formattedData = jsonData.map((row) =>
        row.map((cell) => {
          if (typeof cell === "number") {
            if (cell > 40000 && cell < 60000) {
              return formatExcelDate(cell);
            }
            return cell.toLocaleString("ru-RU");
          }
          if (isTimeValue(cell)) {
            return cell;
          }
          return cell;
        })
      );

      setEditableData(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const newData = [...editableData];
    newData[rowIndex][cellIndex] = value;
    setEditableData(newData);
  };

  const handleSave = async () => {
    try {
      await saveSheet(editableData).unwrap();
      alert("Данные успешно сохранены!");
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Не удалось сохранить данные");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Container sx={{ width: "80%" }}>
        <Button component="label" variant="contained">
          Upload Excel File
          <VisuallyHiddenInput
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsEdit(!isEdit)}
          sx={{ ml: 1 }}
        >
          {isEdit ? "Закончить редактирование" : "Редактировать"}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          sx={{ ml: 1 }}
        >
          Сохранить и отправить
        </Button>

        {editableData.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {editableData[0].map((header, index) => (
                    <TableCell key={index} align="center">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {editableData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} align="center">
                        <TextField
                          value={cell}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex + 1,
                              cellIndex,
                              e.target.value
                            )
                          }
                          disabled={!isEdit}
                          variant="standard"
                          size="small"
                          sx={{ width: "100%" }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default Main;

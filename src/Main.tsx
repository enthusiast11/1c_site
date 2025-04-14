//Повторный загрузка файла не вызывает метод пагинации
//Проверить метод pagination и загрузку данных

import React, { useEffect, useState } from "react";
import { useSaveSheetMutation } from "./store/rtk-query/sendSheet";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Pagination,
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
  const [fullData, setFullData] = useState<Array<Array<string | number>>>([]);
  const [visibleData, setVisibleData] = useState<Array<Array<string | number>>>(
    []
  );
  const [isEdit, setIsEdit] = useState(false);

  const [saveSheet] = useSaveSheetMutation();

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setVisibleData(fullData.slice((currentPage - 1) * 15, currentPage * 15));
  }, [currentPage, fullData]);

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

      setFullData(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const newData = [...fullData];
    newData[rowIndex][cellIndex] = value;
    setFullData(newData);
  };

  const handleSave = async () => {
    try {
      console.log("Проверка данных", fullData);

      await saveSheet(fullData).unwrap();
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

        {visibleData.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 4,
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            <Table>
              {currentPage === 1 ? (
                <TableHead>
                  <TableRow>
                    {visibleData[0].map((header, index) => (
                      <TableCell key={index} align="center">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              ) : (
                ""
              )}
              <TableBody>
                {visibleData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        align="center"
                        sx={{
                          minWidth: 140,
                          width: "auto",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
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
        {fullData.length === 0 ? (
          ""
        ) : (
          <Box
            sx={{
              padding: "16px 0",
              display: "flex",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <Pagination
              sx={{ padding: "8px" }}
              count={Math.ceil(fullData.length / 15)}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
            ></Pagination>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Main;

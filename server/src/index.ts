import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import * as XLSX from "xlsx";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const excelFilePath = path.join(__dirname, "аб_30.11.xlsx");

const readExcelFile = (): any[] => {
  try {
    const workbook = XLSX.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Берем первый лист
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};

app.get("/api/excel", (req: Request, res: Response) => {
  const data = readExcelFile();
  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(500).json({ message: "Failed to load Excel data" });
  }
});

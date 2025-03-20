import React, { useState } from "react";
import * as XLSX from "xlsx";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router";

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
const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const Main = (props: Props) => {
  const [excelData, setExcelData] = useState<Array<Array<string | number>>>([]);
  const admin = localStorage.getItem("admin");
  const navigate = useNavigate();

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

      setExcelData(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };
  // Material ui

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  let menuItem = ["Выйти"];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const LogOut = () => {
    navigate("/");
    localStorage.removeItem("admin");
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Выйти" onClick={LogOut} />
          </ListItemButton>
        </ListItem>
        {admin ? (
          <ListItemButton>
            <ListItemText
              primary="Админ панель"
              onClick={() => navigate("/admin")}
            />
          </ListItemButton>
        ) : (
          ""
        )}
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Container sx={{ width: "80%" }}>
        <Button component="label" variant="contained">
          Upload Excel File
          <VisuallyHiddenInput
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </Button>

        {excelData.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {excelData[0].map((header, index) => (
                    <TableCell key={index} align="center">
                      <strong>{header}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {excelData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} align="center">
                        {cell}
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

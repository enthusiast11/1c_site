import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AdminState {
  admLogin: string;
  admPass: string;
  repeatPass: string;
  excelData: Array<Array<string | number>>;
  isEditing: boolean;
}

const initialState: AdminState = {
  admLogin: "",
  admPass: "",
  repeatPass: "",
  excelData: [],
  isEditing: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdminState(state, action: PayloadAction<Partial<AdminState>>) {
      return { ...state, ...action.payload };
    },
    clearAdminState(state) {
      return initialState;
    },
  },
});

export const { updateAdminState, clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;

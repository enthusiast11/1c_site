import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  admLogin: string;
  admPass: string;
  repeatPass: string;
  excelData: Array<Array<string>>;
  isEditing: boolean;
  url: string;
}

const initialState: AdminState = {
  admLogin: "",
  admPass: "",
  repeatPass: "",
  excelData: [],
  isEditing: false,
  url: "https//test.ru",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateAdminState(state, action: PayloadAction<Partial<AdminState>>) {
      return { ...state, ...action.payload };
    },
    updateUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    clearAdminState(state) {
      return initialState;
    },
  },
});

export const { updateAdminState, clearAdminState, updateUrl } =
  adminSlice.actions;
export default adminSlice.reducer;

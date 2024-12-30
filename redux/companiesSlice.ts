import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanies = createAsyncThunk("companies/fetchCompanies", async () => {
    const response = await axios.get("/api/companies");
    return response.data;
});

const companiesSlice = createSlice({
    name: "companies",
    initialState: { list: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchCompanies.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default companiesSlice.reducer;

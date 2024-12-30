import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("/api/users");
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState: { list: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default usersSlice.reducer;

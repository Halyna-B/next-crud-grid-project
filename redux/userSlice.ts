import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("/api/users");
    return response.data;
});

export const createUser = createAsyncThunk(
    'users/createUser',
    async (user: { name: string; email: string; companies: string[] }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/users', user);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || 'An error occurred');
        }
    }
);

interface UsersState {
    list: { _id: string; name: string; email: string; companies: string[] }[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    list: [],
    status: 'idle',
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.status = "failed";
            })
            // Create user
            .addCase(createUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;


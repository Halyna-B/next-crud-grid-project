import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get('/api/users');
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

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id: string) => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
});

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({_id, name, email, companies}: { _id: string; name: string; email: string; companies: string[] }) => {
        const response = await axios.put(`/api/users/${_id}`, {name, email, companies}); // API route for updating user
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/users/${id}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue("Failed to delete user.");
        }
    }
);

interface UsersState {
    list: { _id: string; name: string; email: string; companies: string[] }[];
    currentUser: { _id: string; name: string; email: string; companies: string[] } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UsersState = {
    list: [],
    currentUser: null,
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

            // Fetch user by ID
            .addCase(fetchUserById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Create user
            .addCase(createUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list.push(action.payload); // Add the newly created user to the list
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Update user
            .addCase(updateUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.list.findIndex((user) => user._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }

                if (state.currentUser && state.currentUser._id === action.payload._id) {
                    state.currentUser = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Delete user
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.list = state.list.filter((user) => user._id !== action.payload._id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;



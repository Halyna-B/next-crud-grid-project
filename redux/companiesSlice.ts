import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";

export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
    const response = await axios.get('/api/companies');
    return response.data;
});

export const createCompany = createAsyncThunk(
    'companies/createCompany',
    async (company: { name: string; address: string; users: string[] }, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/companies', company);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data || 'An error occurred');
        }
    }
);

export const fetchCompanyById = createAsyncThunk("companies/fetchCompanyById", async (id: string) => {
    const response = await axios.get(`/api/companies/${id}`);
    return response.data;
});

export const updateCompany = createAsyncThunk(
    'companies/updateCompany',
    async ({_id, name, address, users}: { _id: string; name: string; address: string; users: string[] }) => {
        const response = await axios.put(`/api/companies/${_id}`, {name, address, users});
        return response.data;
    }
);

export const deleteCompany = createAsyncThunk(
    "companies/deleteCompany",
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/companies/${id}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue("Failed to delete company.");
        }
    }
);


interface CompaniesState {
    list: { _id: string; name: string; address: string; users: string[] }[];
    currentCompany: { _id: string; name: string; address: string; users: string[] } | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CompaniesState = {
    list: [],
    currentCompany: null,
    status: 'idle',
    error: null,
};

const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch companies
            .addCase(fetchCompanies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchCompanies.rejected, (state) => {
                state.status = "failed";
            })
            // Fetch company by ID
            .addCase(fetchCompanyById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCompanyById.fulfilled, (state, action) => {
                state.currentCompany = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchCompanyById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })

            // Create company
            .addCase(createCompany.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list.push(action.payload);
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Update user
            .addCase(updateCompany.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.list.findIndex((company) => company._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }

                if (state.currentCompany && state.currentCompany._id === action.payload._id) {
                    state.currentCompany = action.payload;
                }
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Delete user
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.list = state.list.filter((company) => company._id !== action.payload._id);
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default companiesSlice.reducer;

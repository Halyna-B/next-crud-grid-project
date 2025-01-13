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

interface CompaniesState {
    list: { _id: string; name: string; address: string; users: string[] }[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CompaniesState = {
    list: [],
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
            });
    },
});

export default companiesSlice.reducer;

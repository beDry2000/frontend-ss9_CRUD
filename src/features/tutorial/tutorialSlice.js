import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tutorialService from './tutorialService';

const initialState = {
    tutorials: [],
    tutorial: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// getAll
export const getAll = createAsyncThunk(
    'tutorials/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await tutorialService.getTutorials(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// get One by Id 
export const getById = createAsyncThunk(
    'tutorials/getById',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await tutorialService.getById(id,token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// create 
export const create = createAsyncThunk(
    'tutorials/create',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tutorialService.create(data,token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// update
export const update = createAsyncThunk(
    'tutorials/update',
    async (updateData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tutorialService.update(updateData,token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// delete 
export const delTutorial = createAsyncThunk(
    'tutorials/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await tutorialService.del(id,token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tutorials = action.payload;
            })
            .addCase(getById.fulfilled, (state,action) => {
                state.isSuccess = true;
                state.tutorial = action.payload.tutorial;
            })
            .addCase(update.fulfilled, (state) => {
                state.isSuccess = true;
            })
            .addCase(delTutorial.fulfilled, (state) => {
                state.isSuccess = true;
            })
            .addCase(create.fulfilled, (state) => {
                state.isSuccess = true;
            })
            .addCase(create.rejected, (state,action) => {
                state.isSuccess = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = tutorialSlice.actions;


export default tutorialSlice.reducer;

import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import { groupService } from "../../services";
import { IErrorGroup, IGroup } from "../../interfaces";

interface IState {
    groups: IGroup[];
    groupTrigger: boolean;
    loading: boolean;
    vision: boolean;
    errorGroup: IErrorGroup;
}

const initialState: IState = {
    groups: [],
    groupTrigger: false,
    loading: false,
    vision: false,
    errorGroup: null
};

const getAll = createAsyncThunk<IGroup[], void>(
    'groupSlice/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await groupService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {group: IGroup}>(
    'groupSlice/create',
    async ({ group }, { rejectWithValue }) => {
        try {
            await groupService.create(group);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'groupSlice',
    initialState,
    reducers: {
        setVision: state => {
            state.vision = !state.vision;
            state.errorGroup = null;
        },
        setVisionDefault: state => {
            state.vision = false;
            state.errorGroup = null;
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.groups = action.payload;
            state.errorGroup = null;
            state.loading = false;
        })
        .addCase(create.fulfilled, state => {
            state.groupTrigger = !state.groupTrigger;
            state.errorGroup = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.errorGroup = action.payload;
        })
});

const {actions, reducer: groupReducer} = slice;
const groupActions = {
    ...actions,
    getAll,
    create
};

export {
    groupActions,
    groupReducer
};

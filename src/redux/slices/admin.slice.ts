import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { adminService } from "../../services";
import { IErrorUser, IOrderStatistic, IPagination, IParams, IUser, IUserStatistic } from "../../interfaces";

interface IState {
    users: IUser[];
    userTrigger: boolean;
    loading: boolean;
    orderStatistic: IOrderStatistic;
    userStatistic: IUserStatistic;
    openUserForm: boolean;
    showParams: boolean;
    totalPagesUsers: number;
    paramsUsers: IParams;
    errorUser: IErrorUser;
}

const initialState: IState = {
    users: [],
    userTrigger: false,
    loading: false,
    orderStatistic: {},
    userStatistic: {},
    openUserForm: false,
    showParams: false,
    totalPagesUsers: 0,
    paramsUsers: {},
    errorUser: null
};

const getAll = createAsyncThunk<IPagination<IUser[]>, {params: IParams}>(
    'adminSlice/getAll',
    async ({ params }, { rejectWithValue }) => {
        try {
            const {data} = await adminService.getAll(params);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {user: IUser}>(
    'adminSlice/create',
    async ({ user }, { rejectWithValue }) => {
        try {
            await adminService.create(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const ban = createAsyncThunk<void, {id: string}>(
    'adminSlice/ban',
    async ({ id }, { rejectWithValue }) => {
        try {
            await adminService.ban(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const unban = createAsyncThunk<void, {id: string}>(
    'adminSlice/ban',
    async ({ id }, { rejectWithValue }) => {
        try {
            await adminService.unban(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getStatisticOrder = createAsyncThunk<IOrderStatistic, void>(
    'adminSlice/getStatisticOrder',
    async (_, { rejectWithValue }) => {
        try {
            const {data} = await adminService.getStatisticOrder();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getStatisticUser = createAsyncThunk<IUserStatistic, {id: number}>(
    'adminSlice/getStatisticUser',
    async ({ id }, { rejectWithValue }) => {
        try {
            const {data} = await adminService.getStatisticUser(id.toString());
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        openUserForm: state => {
            state.openUserForm = !state.openUserForm;
        },
        closeUserForm: state => {
            state.openUserForm = false;
            state.paramsUsers.page = '1';
            state.errorUser = null;
        },
        setPage: (state, action) => {
            state.paramsUsers.page = action.payload;
            state.showParams = true;
        },
        setSearchUser: (state, action) => {
            state.paramsUsers.surname = action.payload;
            state.showParams = true;
        },
        resetParams: state => {
            state.paramsUsers = {};
            state.showParams = false;
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const {result, total_pages} = action.payload;
            state.users = result;
            state.totalPagesUsers = total_pages;
            state.errorUser = null;
            state.loading = false;
        })
        .addCase(getStatisticOrder.fulfilled, (state, action) => {
            state.orderStatistic = action.payload;
            state.errorUser = null;
        })
        .addCase(getStatisticUser.fulfilled, (state, action) => {
            state.userStatistic = action.payload;
            state.errorUser = null;
        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.errorUser = null;
        })
        .addMatcher(isFulfilled(create, ban, unban), state => {
            state.userTrigger = !state.userTrigger;
            state.loading = false;
            state.openUserForm = false;
            state.errorUser = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorUser = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.loading = false;
            state.errorUser = action.payload;
        })
});

const {actions, reducer: adminReducer} = slice;
const adminActions = {
    ...actions,
    getAll,
    create,
    ban,
    unban,
    getStatisticOrder,
    getStatisticUser
};

export {
    adminActions,
    adminReducer
};

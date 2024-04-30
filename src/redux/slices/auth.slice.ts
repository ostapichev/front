import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { authService } from "../../services";
import { IActivateLink, IAuth, IErrorAuth, IUser } from "../../interfaces";

interface IState {
    me: IUser;
    loading: boolean;
    authTrigger: boolean;
    textModal: string;
    activateToken: IActivateLink;
    error: IErrorAuth;
    confirmError?: string;
}

const initialState: IState = {
    me: null,
    loading: false,
    authTrigger: true,
    textModal: null,
    activateToken: null,
    error: null,
    confirmError: null
};

const login = createAsyncThunk<IUser, IAuth>(
    'authSlice/login',
    async (user, { rejectWithValue }) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const activateUser = createAsyncThunk<string, {formData: FormData}>(
    'userSlice/activateUser',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const {request} = await authService.activateUser(formData);
            return request.response;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const activateRequestUser = createAsyncThunk<void, {formData: FormData, token: string}>(
    'authSlice/activateRequestUser',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            return await authService.activateRequestUser(formData, token);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const recoveryPassword = createAsyncThunk<string, {formData: FormData}>(
    'userSlice/recoveryPassword',
    async ({ formData }, { rejectWithValue }) => {
        try {
            const {request} = await authService.recoveryPassword(formData);
            return request.response;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const recoveryRequestPassword = createAsyncThunk<void, {formData: FormData, token: string}>(
    'authSlice/recoveryRequestPassword',
    async ({ formData, token }, { rejectWithValue }) => {
        try {
            return await authService.recoveryPasswordRequest(formData, token);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const activateLink = createAsyncThunk<IActivateLink, {id: string}>(
    'authSlice/activateLink',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await authService.getActivateLink(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const me = createAsyncThunk<IUser, void> (
    'authSlice/me',
    async () => {
        const { data } = await authService.me();
        return data;
    }
);

const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logout: state => {
            state.me = null;
        },
        setConfirmError: (state, action) => {
            state.confirmError = action.payload;
        },
        resetLoading: (state) => {
            state.loading = false;
        },
        closeModal: state => {
            state.textModal = null;
            state.error = null;
        }
    },
    extraReducers: builder => builder
        .addCase(me.rejected, state => {
            state.loading = false;
            state.error = null;
        })
        .addCase(activateLink.fulfilled, (state, action) => {
            state.loading = false;
            state.authTrigger = !state.authTrigger;
            state.activateToken = action.payload;
            state.textModal = JSON.stringify(state.activateToken.msg);
        })
        .addMatcher(isFulfilled(login, me), (state, action) => {
            state.me = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addMatcher(isFulfilled(activateUser, recoveryPassword), (state, action) => {
            state.loading = false;
            state.authTrigger = !state.authTrigger;
            state.textModal = action.payload;
            state.error = null;
            state.confirmError = null;
        })
        .addMatcher(isFulfilled(activateRequestUser, recoveryRequestPassword), state => {
            state.loading = false;
            state.authTrigger = !state.authTrigger;
            state.error = null;
            state.confirmError = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.error = null;
            state.confirmError = null;
        })
        .addMatcher(isRejectedWithValue(), (state, actions) => {
            state.error = actions.payload as IErrorAuth;
            state.loading = false;
        })
});

const {actions, reducer: authReducer} = slice;
const authActions = {
    ...actions,
    login,
    activateLink,
    activateUser,
    activateRequestUser,
    recoveryPassword,
    recoveryRequestPassword,
    me
};

export {
    authReducer,
    authActions
};

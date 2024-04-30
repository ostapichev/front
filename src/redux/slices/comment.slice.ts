import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

import { commentService } from "../../services";
import { IComment, IErrorComment } from "../../interfaces";

interface IState {
    comments?: IComment[];
    commentTrigger: boolean;
    loading: boolean;
    pageSize: number;
    startShowComment: number;
    endShowComments: number;
    pageComments: number;
    totalPageComments: number;
    errorsComment?: IErrorComment;
}

const initialState: IState = {
    comments: null,
    commentTrigger: false,
    loading: false,
    pageSize: 5,
    startShowComment: 0,
    endShowComments: 5,
    pageComments: 1,
    totalPageComments: 1,
    errorsComment: null
};

const create = createAsyncThunk<void, {order_id: number, comment: IComment}>(
    'commentSlice/create',
    async ({ order_id, comment }, { rejectWithValue }) => {
        try {
            await commentService.create(order_id.toString(), comment);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.pageComments = action.payload;
            state.startShowComment = (state.pageComments - 1) * state.pageSize;
            state.endShowComments = (state.pageComments - 1) * state.pageSize + state.pageSize;
        },
        setDefaultPaginate: state => {
            state.startShowComment = 0;
            state.endShowComments = 5;
            state.pageComments = 1;
        },
        setTotalPages: (state, action) => {
            state.totalPageComments = action.payload;
        },
    },
    extraReducers: builder => builder
        .addCase(create.fulfilled, state => {
            state.commentTrigger = !state.commentTrigger;
        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.errorsComment = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorsComment = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.errorsComment = action.payload;
            state.loading = false;
        })
});

const {actions, reducer: commentReducer} = slice;
const commentActions = {
    ...actions,
    create
};

export {
    commentActions,
    commentReducer
};

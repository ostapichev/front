import { AxiosError, AxiosResponse } from "axios";
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import FileSaver from "file-saver";

import { IErrorOrder, IOrder, IPagination, IParams } from "../../interfaces";
import { orderService } from "../../services";

interface IState {
    orders: IOrder[];
    orderUpdate: IOrder;
    orderCreate: string;
    orderTrigger: boolean;
    loading: boolean;
    totalPagesOrders: number;
    openOrderForm: boolean;
    checkbox: boolean;
    sorted: boolean;
    paramsOrders: IParams;
    errorsOrder: IErrorOrder;
}

const initialState: IState = {
    orders: [],
    orderUpdate: null,
    orderCreate: null,
    orderTrigger: false,
    loading: false,
    totalPagesOrders: 0,
    openOrderForm: false,
    checkbox: false,
    sorted: true,
    paramsOrders: {},
    errorsOrder: null
};

const getAll = createAsyncThunk<IPagination<IOrder[]>, {params: IParams}>(
    'orderSlice/getAll',
    async ({ params }, { rejectWithValue }) => {
        try {
            const {data} = await orderService.getAll(params);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<void, {groupId: string, order: IOrder}>(
    'orderSlice/create',
    async ({ groupId, order }, { rejectWithValue }) => {
        try {
            await orderService.create(groupId, order);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const update = createAsyncThunk<void, {id: number, order: IOrder}>(
    'orderSlice/update',
    async ({ id, order }, { rejectWithValue }) => {
        try {
            await orderService.updateById(id.toString(), order)
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const getExelFile = createAsyncThunk<void, {params: IParams}>(
    'orderSlice/getExelFile',
    async ({ params }, { rejectWithValue }) => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.sheet;charset=UTF-8";
        const fileName: string = new Date().toISOString().slice(0, 10);
        try {
            const response: AxiosResponse = await orderService.createExelFile(params);
            const blob = new Blob([response.data],{type: fileType});
            return FileSaver.saveAs(blob,`${fileName}.xlsx`);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const slice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.paramsOrders.page = action.payload;
        },
        setCheckBox: (state, action) => {
            state.checkbox = !state.checkbox;
            if (state.checkbox) {
                state.paramsOrders.manager = action.payload;
            } else {
                state.paramsOrders.manager = '';
            }
        },
        setOrderByParams: (state, action) => {
            state.paramsOrders.order_by = action.payload;
            state.sorted = !state.sorted;
        },
        setNameInputData: (state, action) => {
            state.paramsOrders.name = action.payload;
        },
        setSurnameInputData: (state, action) => {
            state.paramsOrders.surname = action.payload;
        },
        setEmailInputData: (state, action) => {
            state.paramsOrders.email = action.payload;
        },
        setPhoneInputData: (state, action) => {
            state.paramsOrders.phone = action.payload;
        },
        setAgeInputData: (state, action) => {
            state.paramsOrders.age = action.payload;
        },
        setCourseInputData: (state, action) => {
            state.paramsOrders.course = action.payload;
        },
        setCourseFormatInputData: (state, action) => {
            state.paramsOrders.course_format = action.payload;
        },
        setCourseTypeInputData: (state, action) => {
            state.paramsOrders.course_type = action.payload;
        },
        setStatus: (state, action) => {
            state.paramsOrders.status = action.payload;
        },
        setGroup: (state, action) => {
            state.paramsOrders.group = action.payload;
        },
        setStartDateInputData: (state, action) => {
            state.paramsOrders.created_at_after = action.payload;
        },
        setEndDateInputData: (state, action) => {
            state.paramsOrders.created_at_before = action.payload;
        },
        setManager: (state, action) => {
            state.paramsOrders.manager = action.payload;
        },
        setOrderUpdate: (state, action) => {
            state.orderUpdate = action.payload;
            state.openOrderForm = true;
            state.errorsOrder = null;
        },
        setOrderCreate: (state, action) => {
            state.orderCreate = action.payload;
        },
        openForm: state => {
            state.openOrderForm = true;
        },
        closeForm: state => {
            state.openOrderForm = false;
            state.orderUpdate = null;
            state.errorsOrder = null;
        },
        resetOrders: state => {
            state.orders = [];
        },
        resetParams: state => {
            state.paramsOrders = {};
            state.checkbox = false;
            state.sorted = true;
        }
    },
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            const {result, total_pages} = action.payload;
            state.orders = result;
            state.totalPagesOrders = total_pages;
            state.errorsOrder = null;
        })
        .addCase(update.fulfilled, state => {
            state.orderUpdate = null;
            state.openOrderForm = false;
        })
        .addMatcher(isFulfilled(create, update), state => {
            state.orderTrigger = !state.orderTrigger;
            state.errorsOrder = null;
        })
        .addMatcher(isFulfilled(), state => {
            state.loading = false;
            state.errorsOrder = null;
        })
        .addMatcher(isPending(), state => {
            state.loading = true;
            state.errorsOrder = null;
        })
        .addMatcher(isRejectedWithValue(), (state, action) => {
            state.errorsOrder = action.payload;
            state.loading = false;
        })
});

const {actions, reducer: orderReducer} = slice;
const orderActions = {
    ...actions,
    getAll,
    create,
    update,
    getExelFile
};

export {
    orderActions,
    orderReducer
};

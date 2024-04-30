import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { adminReducer, authReducer, commentReducer, groupReducer, orderReducer } from "./slices";

const rootReducer = combineReducers({
    adminReducer,
    authReducer,
    commentReducer,
    groupReducer,
    orderReducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['adminReducer', 'commentReducer', 'groupReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const setupStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
});

const persist = persistStore(setupStore);

type AppStore = typeof setupStore;
type RootState = ReturnType<typeof rootReducer>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppDispatch
};

export {
    setupStore,
    persist
};

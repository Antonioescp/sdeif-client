import { configureStore } from '@reduxjs/toolkit';
import databaseReducer from './Database';

// para entender los conceptos utilizados por redux como state, action y dispatcher, asi como
// para entender los motivos de su uso visitar:
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts

// para aprender a crear slices y como crear una store:
// https://redux-toolkit.js.org/tutorials/quick-start

export const store = configureStore({
    reducer: {
        database: databaseReducer,
    },
});

// obteniendo los tipos del estado y del dispatcher
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
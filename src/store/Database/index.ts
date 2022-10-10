import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export enum ConnectionStatus {
    Active,
    Inactive,
    Error
}

export interface DatabaseState {
    connection: ConnectionStatus;
};

const initialState: DatabaseState = {
    connection: ConnectionStatus.Inactive
};

export const databaseSlice = createSlice({
    name: 'database',
    initialState,
    reducers: {
        updateConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
            state.connection = action.payload;
        },
    }
});

export const { updateConnectionStatus } = databaseSlice.actions;
export default databaseSlice.reducer;
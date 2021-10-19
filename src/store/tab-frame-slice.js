import {createSlice} from '@reduxjs/toolkit';

export const tabFrameSlice = createSlice({
    name: 'tabFrame',
    initialState: {
        tab: 'terms'
    },
    reducers: {
        updateTab: (state, action) => {
            if (action.payload !== state.tab) {
                state.tab = action.payload;
            }
        },
    }
});

export const {updateTab} = tabFrameSlice.actions;

export default tabFrameSlice.reducer;

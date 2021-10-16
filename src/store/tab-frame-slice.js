import {createSlice} from '@reduxjs/toolkit';

export const tabFrameSlice = createSlice({
    name: 'tabFrame',
    initialState: {
        tabs: {
            terms: {
                id: 'ntm-tab-terms',
                classNames: ['nav-tab'],
            },
            slots: {
                id: 'ntm-tab-slots',
                classNames: ['nav-tab', 'nav-tab-active'],
            }
        },
        frames: {
            terms: {
                id: 'ntm-frame-terms',
                classNames: ['ntm-tab-frame']
            },
            slots: {
                id: 'ntm-frame-slots',
                classNames: ['ntm-tab-frame', 'ntm-frame-active']
            }
        },
    },
    reducers: {
        switchTabFrame: (state, action) => {
            const target = action.payload;

            Object.keys(state.tabs).map(k => {
                state.tabs[k].classNames = ['nav-tab'];
            });
            state.tabs[target].classNames.push('nav-tab-active');

            Object.keys(state.frames).map(k => {
                state.frames[k].classNames = ['ntm-tab-frame'];
            });
            state.frames[target].classNames.push('ntm-frame-active');
        }
    }
});

export const {switchTabFrame} = tabFrameSlice.actions;

export default tabFrameSlice.reducer;

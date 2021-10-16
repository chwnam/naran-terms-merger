import {configureStore} from "@reduxjs/toolkit";

import tabFrameSlice from './tab-frame-slice'
import taxSlotSlice from "./tax-slot-slice";

export default configureStore({
    reducer: {
        tabFrame: tabFrameSlice,
        taxSlot: taxSlotSlice,
    }
});

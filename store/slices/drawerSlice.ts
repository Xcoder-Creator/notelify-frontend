import { DrawerReduxStateProps } from '@/types/drawer-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/*
    This redux slice manages the state of the drawer
*/
const initialState: DrawerReduxStateProps = {
    isCollapsed: false,
    mobileDrawer: false
};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        /* Toggle the collapsed state of the drawer */
        toggleCollapsedDrawer(state) {
            state.isCollapsed = !state.isCollapsed;
        },

        /* Toggle the open or close state of the drawer */
        toggleMobileDrawer(state, action: PayloadAction<boolean>) {
            state.mobileDrawer = action.payload;
        }
    }
});

export const { toggleCollapsedDrawer, toggleMobileDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
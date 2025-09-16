import { DrawerReduxStateProps } from '@/types/drawer-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleMobileDrawerProps {
    /** The opened or closed state of the mobile drawer */
    value: boolean;
}

/*
    This redux slice is for managing the state of the drawer
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
        toggleCollapsedDrawer(state, action: PayloadAction<void>) {
            state.isCollapsed = !state.isCollapsed;
        },

        /* Toggle the open or close state of the drawer */
        toggleMobileDrawer(state, action: PayloadAction<ToggleMobileDrawerProps>) {
            state.mobileDrawer = action.payload.value;
        }
    },
});

export const { toggleCollapsedDrawer, toggleMobileDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
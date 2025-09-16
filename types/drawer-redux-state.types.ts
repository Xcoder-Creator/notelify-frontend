/** Interface for the drawer redux state */
export interface DrawerReduxStateProps {
    /** A redux state property for keeping track of the collapsed state of the drawer */
    isCollapsed: boolean;

    /** A redux state property for managing the state of the mobile drawer */
    mobileDrawer: boolean;
}
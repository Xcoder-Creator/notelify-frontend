import { UserAuthReduxStateProps, UserData } from '@/types/user-auth-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** 
 * The interface for the updateErrMsgAndErr reducer method. 
 */
interface UpdateErrMsgAndErrorReducerProps {
    /** The error message from the backend API */
    errMsg: string | null;

    /** The error state */
    error: boolean;
}

/** 
 * The interface for the updateSuccessMsgAndSuccess reducer method. 
 */
interface UpdateSuccessMsgAndSuccessReducerProps {
    /** The success message from the backend API */
    successMsg: string | null;

    /** The success state */
    success: boolean;
}

/** 
 * The interface for the updateUserData reducer method. 
 */
interface UpdateUserDataReducerProps {
    /** The users data */
    userData: UserData | null;
}

/** 
 * The interface for the updateLoadingScreen reducer method. 
 */
interface UpdateLoadingScreenReducerProps {
    /** Controls the state of the loading screen */
    loadingScreen: boolean;
}

/** 
 * The interface for the updateVerifyPending reducer method. 
 */
interface UpdateVerifyPendingReducerProps {
    /** 
     * The state of the verify pending page that 
     * displays after a successful account creation  
     */
    value: boolean;
}

/** 
 * The interface for the updateEmailForAccountVerification reducer method. 
 */
interface UpdateEmailForAccountVerificationReducerProps {
    /** The email address for account verification */
    email: string | null;
}

/** 
 * The interface for the updatewarningMsgAndInfo reducer method. 
 */
interface UpdateWarningMsgAndWarningReducerProps {
    /** The warning message from the backend API */
    warningMsg: string | null;

    /** The warning state */
    warning: boolean;
}

/*
    This redux slice is for managing the state of the users authentication
*/
const initialState: UserAuthReduxStateProps = {
    userData: null,
    errMsg: null,
    error: false,
    successMsg: null,
    success: false,
    warningMsg: null,
    warning: false,
    loadingScreen: true,
    verifyPending: false,
    verifyAccount: false,
    emailForAccountVerification: null
};

const authApiSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        /* Update the error msg and error state properties */
        updateErrMsgAndError(state, action: PayloadAction<UpdateErrMsgAndErrorReducerProps>) {
            state.errMsg = action.payload.errMsg;
            state.error = action.payload.error;
        },

        /* Update the success msg and success state properties */
        updateSuccessMsgAndSuccess(state, action: PayloadAction<UpdateSuccessMsgAndSuccessReducerProps>) {
            state.successMsg = action.payload.successMsg;
            state.success = action.payload.success;
        },

        /* Update the user data state property */
        updateUserData(state, action: PayloadAction<UpdateUserDataReducerProps>) {
            state.userData = action.payload.userData;
        },

        /** Update the loading screen state */
        updateLoadingScreen(state, action: PayloadAction<UpdateLoadingScreenReducerProps>) {
            state.loadingScreen = action.payload.loadingScreen;
        },

        /** Update the verify pending state */
        updateVerifyPending(state, action: PayloadAction<UpdateVerifyPendingReducerProps>) {
            state.verifyPending = action.payload.value;
        },

        /** Update the email address for account verification */
        updateEmailForAccountVerification(state, action: PayloadAction<UpdateEmailForAccountVerificationReducerProps>) {
            state.emailForAccountVerification = action.payload.email;
        },

        /* Update the warning msg and warning state properties */
        updateWarningMsgAndWarning(state, action: PayloadAction<UpdateWarningMsgAndWarningReducerProps>) {
            state.warningMsg = action.payload.warningMsg;
            state.warning = action.payload.warning;
        },

        /** Update the verify account state */
        updateVerifyAccount(state, action: PayloadAction<{ value: boolean }>) {
            state.verifyAccount = action.payload.value;
        }
    },
});

export const { updateErrMsgAndError, updateSuccessMsgAndSuccess, updateUserData, updateLoadingScreen, updateVerifyPending, updateEmailForAccountVerification, updateWarningMsgAndWarning, updateVerifyAccount } = authApiSlice.actions;
export default authApiSlice.reducer;
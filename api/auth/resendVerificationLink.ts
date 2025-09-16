import { AppDispatch, store } from "@/store";
import { updateMsg, updateOpen } from "@/store/slices/snackbarSlice";
import { updateErrMsgAndError, updateSuccessMsgAndSuccess } from "@/store/slices/userAuthSlice";
import axios from "axios";

/**
 * This method allows the user to log into the app.
 * @param dispatch - The redux dispatch function
 * @param controllerRef - The abort controller reference
 * @param setIsSubmitting - The setter for the isSubmitting state
 * @return void
 */
const resendVerificationLink = async (dispatch: AppDispatch, controllerRef: React.RefObject<AbortController | null>, setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    
    // Clear and disable the error and success alert when the user tries to resend a verification link
    dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
    dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
    let emailForAccountVerification = store.getState().userAuth.emailForAccountVerification;

    try {
        await axios.post(`/api/auth/resend-verification-link`, { email: emailForAccountVerification },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controllerRef.current.signal
            }
        );

        setIsSubmitting(false);
        dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: true }));
        dispatch(updateMsg("A new verification link has just been sent to your email."));
        dispatch(updateOpen(true));
    } catch (error: any) {
        dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
        setIsSubmitting(false);
        
        /*
            Check if the error is coming from a canceled request
        */
        if (axios.isCancel(error)) {
            return;
        }

        /* 
            Check if the error is an axios error and also check 
            if a response was sent back from the server.
        */
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.data.message){
                dispatch(updateErrMsgAndError({ errMsg: null, error: true }));
                dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
                dispatch(updateMsg(error.response.data.message));
                dispatch(updateOpen(true));
            } else {
                dispatch(updateErrMsgAndError({ errMsg: null, error: true }));
                dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
                dispatch(updateMsg("A network error just occurred, please try again later"));
                dispatch(updateOpen(true));
            }
        } else {
            dispatch(updateErrMsgAndError({ errMsg: null, error: true }));
            dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
            dispatch(updateMsg("A network error just occurred, please try again later"));
            dispatch(updateOpen(true));
        }
    }
}

export default resendVerificationLink;
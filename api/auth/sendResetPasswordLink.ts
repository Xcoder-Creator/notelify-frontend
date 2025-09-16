import { AppDispatch } from "@/store";
import { updateErrMsgAndError, updateSuccessMsgAndSuccess, updateWarningMsgAndWarning } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * The forgot password details.
 */
interface ForgotPasswordDetails {
    /** The users email or username */
    emailOrUsername: string;
}

/**
 * This method sends a reset password link to the user through email.
 * @param dispatch - The redux dispatch function
 * @param forgotPasswordDetails - The forgot password details needed to send a reset password link to the user
 * @param router - The next/navigation router object
 * @param controllerRef - The abort controller reference
 * @return void
 */
const sendResetPasswordLink = async (dispatch: AppDispatch, forgotPasswordDetails: ForgotPasswordDetails, router: ReturnType<typeof useRouter>, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    
    // Clear and disable the error, success and info alert when the user tries to login
    dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
    dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
    dispatch(updateWarningMsgAndWarning({ warningMsg: null, warning: false }));

    try {
        const res = await axios.post(`/api/auth/forgot-password`, forgotPasswordDetails,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controllerRef.current.signal
            }
        );

        dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
        dispatch(updateWarningMsgAndWarning({ warningMsg: null, warning: false }));
        dispatch(updateSuccessMsgAndSuccess({ successMsg: res.data.message, success: true }));
    } catch (error: any) {
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
            if (error.status === 403){
                dispatch(updateWarningMsgAndWarning({ warningMsg: error.response.data.message, warning: true }));
            } else {
                if (error.response.data.message){
                    dispatch(updateErrMsgAndError({ errMsg: error.response.data.message, error: true }));
                } else {
                    dispatch(updateErrMsgAndError({ errMsg: "Network error occured, try again later", error: true }));
                }
            }
        } else {
            dispatch(updateErrMsgAndError({ errMsg: "Network error occured, try again later", error: true }));
        }
    }
}

export default sendResetPasswordLink;
import { AppDispatch, store } from "@/store";
import { updateErrMsgAndError } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";

/**
 * The user reset password details.
 */
interface ResetPasswordDetails {
    /** The users new password */
    newPassword: string;
}

/**
 * This method will be used to reset the users password.
 * @param token - The verification token
 * @param resetPasswordDetails - The users details needed to reset their password
 * @param setError - The setter method for the error state
 * @param setErrorTitle - The setter method for the error title
 * @param setErrMsg - The setter method for the error message
 * @param setSuccess - The setter method for the success state
 * @param controllerRef - The abort controller reference
 * @return void
 */
const resetPassword = async (token: ParamValue, resetPasswordDetails: ResetPasswordDetails, setError: React.Dispatch<React.SetStateAction<boolean>>, setErrorTitle: React.Dispatch<React.SetStateAction<string | null>>, setErrMsg: React.Dispatch<React.SetStateAction<string | null>>, setSuccess: React.Dispatch<React.SetStateAction<boolean>>, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setError(false);
    setSuccess(false);
    setErrorTitle(null);
    setErrMsg(null);
    store.dispatch(updateErrMsgAndError({ errMsg: null, error: false }));

    try {
        await axios.post(`/api/auth/reset-password/${token}`, resetPasswordDetails,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controllerRef.current.signal
            }
        );
        
        setError(false);
        setSuccess(true);
        setErrorTitle(null);
        setErrMsg(null);
    } catch (error) {
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
                store.dispatch(updateErrMsgAndError({ errMsg: error.response.data.message, error: true }));
            } else {
                store.dispatch(updateErrMsgAndError({ errMsg: "An error occurred while resetting your password", error: true }));
            }
        } else {
            store.dispatch(updateErrMsgAndError({ errMsg: "An error occurred while resetting your password", error: true }));
        }
    }
}

export default resetPassword;
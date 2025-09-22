import { AppDispatch, store } from "@/store";
import { updateLoadingScreen } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";

/**
 * This method will be used to verify/validate a reset password token.
 * @param token - The verification token
 * @param setError - The setter method for the error state
 * @param setErrorTitle - The setter method for the error title
 * @param setErrMsg - The setter method for the error message
 * @param setSuccess - The setter method for the success state
 * @param controllerRef - The abort controller reference
 * @return void
 */
const checkResetPasswordToken = async (token: ParamValue, setError: React.Dispatch<React.SetStateAction<boolean>>, setErrorTitle: React.Dispatch<React.SetStateAction<string | null>>, setErrMsg: React.Dispatch<React.SetStateAction<string | null>>, setSuccess: React.Dispatch<React.SetStateAction<boolean>>, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
        await axios.get(`/api/auth/check-reset-token/${token}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controllerRef.current.signal
            }
        );
        
        setError(false);
        setSuccess(false);
        setErrorTitle(null);
        setErrMsg(null);
        store.dispatch(updateLoadingScreen({ loadingScreen: false }));
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
                setError(true);
                setSuccess(false);
                setErrorTitle("Reset Password Failed");
                setErrMsg("This reset password link is either invalid or has expired. Please request a new reset password link below.");
                store.dispatch(updateLoadingScreen({ loadingScreen: false }));
            } else {
                setError(true);
                setSuccess(false);
                setErrorTitle("Reset Password Failed");
                setErrMsg("A network error has occured, please try again later!");
                store.dispatch(updateLoadingScreen({ loadingScreen: false }));
            }
        } else {
            setError(true);
            setErrorTitle("Reset Password Failed");
            setErrMsg("A network error has occured, please try again later!");
            store.dispatch(updateLoadingScreen({ loadingScreen: false }));
        }
    }
}

export default checkResetPasswordToken;
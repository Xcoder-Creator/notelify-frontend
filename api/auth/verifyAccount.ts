import { AppDispatch } from "@/store";
import { updateLoadingScreen } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { ParamValue } from "next/dist/server/request/params";
import { useRouter } from "next/navigation";

/**
 * This method will be used to verify the users account.
 * @param dispatch - The redux dispatch function
 * @param router - The next/navigation router object
 * @param token - The verification token
 * @param setError - The setter method for the error state
 * @param setErrorTitle - The setter method for the error title
 * @param setErrMsg - The setter method for the error message
 * @param controllerRef - The abort controller reference
 * @return void
 */
const verifyAccount = async (dispatch: AppDispatch, router: ReturnType<typeof useRouter>, token: ParamValue, setError: React.Dispatch<React.SetStateAction<boolean>>, setErrorTitle: React.Dispatch<React.SetStateAction<string | null>>, setErrMsg: React.Dispatch<React.SetStateAction<string | null>>, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
        await axios.get(`/api/auth/verify-account/${token}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controllerRef.current.signal
            }
        );
        
        setError(false);
        setErrorTitle(null);
        setErrMsg(null);
        dispatch(updateLoadingScreen({ loadingScreen: false }));
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
                setErrorTitle("Account Verification Failed");
                setErrMsg("This verification link is invalid or has expired. Please login to receive a new verification link.");
                dispatch(updateLoadingScreen({ loadingScreen: false }));
            } else {
                setError(true);
                setErrorTitle("Account Verification Failed");
                setErrMsg("A network error has occured, please try again later!");
                dispatch(updateLoadingScreen({ loadingScreen: false }));
            }
        } else {
            setError(true);
            setErrorTitle("Account Verification Failed");
            setErrMsg("A network error has occured, please try again later!");
            dispatch(updateLoadingScreen({ loadingScreen: false }));
        }
    }
}

export default verifyAccount;
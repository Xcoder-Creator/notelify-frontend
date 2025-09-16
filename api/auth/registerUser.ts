import { AppDispatch, store } from "@/store";
import { updateEmailForAccountVerification, updateErrMsgAndError, updateLoadingScreen, updateSuccessMsgAndSuccess, updateUserData, updateVerifyPending } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * The users details for account creation.
 */
interface UserDetails {
    /** The users email */
    email: string;

    /** The users name */
    username: string;

    /** The users password */
    password: string;
}

/**
 * This method handles account creation on the app.
 * @param dispatch - The redux dispatch function
 * @param userDetails - The details of the user needed for account creation
 * @param router - The next/navigation router object
 * @param controllerRef - The abort controller reference
 * @return void
 */
const registerUser = async (dispatch: AppDispatch, userDetails: UserDetails, router: ReturnType<typeof useRouter>, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    
    // Clear and disable the error alert when the user tries to register
    dispatch(updateErrMsgAndError({ errMsg: null, error: false }));

    try {
        const res = await axios.post(`/api/auth/signup`, userDetails,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                signal: controllerRef.current.signal
            }
        );

        dispatch(updateVerifyPending({ value: true }));
        dispatch(updateEmailForAccountVerification({ email: res.data.email }));
        dispatch(updateLoadingScreen({ loadingScreen: true }));
        router.push('/auth/verify-pending'); // Navigate to the verify pending page
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
                dispatch(updateErrMsgAndError({ errMsg: error.response.data.message, error: true }));
            } else {
                dispatch(updateErrMsgAndError({ errMsg: "Network error occured, try again later", error: true }));
            }
        } else {
            dispatch(updateErrMsgAndError({ errMsg: "Network error occured, try again later", error: true }));
        }
    }
}

export default registerUser;
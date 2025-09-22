import { store } from "@/store";
import { updateEmailForAccountVerification, updateErrMsgAndError, updateLoadingScreen, updateUserData, updateVerifyPending } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * The user login details.
 */
interface LoginDetails {
    /** The users email */
    emailOrUsername: string;

    /** The users password */
    password: string;
}

/**
 * This method allows the user to log into the app.
 * @param loginDetails - The users details needed to log them in
 * @param router - The next/navigation router object
 * @param controllerRef - The abort controller reference
 * @return void
 */
const loginUser = async (loginDetails: LoginDetails, router: ReturnType<typeof useRouter>, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    
    // Clear and disable the error alert when the user tries to login
    store.dispatch(updateErrMsgAndError({ errMsg: null, error: false }));

    try {
        const res = await axios.post(`/api/auth/login`, loginDetails,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                signal: controllerRef.current.signal
            }
        );

        store.dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
        store.dispatch(updateUserData({ userData: res.data.userData }));
        store.dispatch(updateLoadingScreen({ loadingScreen: true }));
        router.push('/'); // Navigate to the home page
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
                store.dispatch(updateVerifyPending({ value: true }));
                store.dispatch(updateEmailForAccountVerification({ email: error.response.data.email }));
                store.dispatch(updateLoadingScreen({ loadingScreen: true }));
                router.push('/auth/verify-pending'); // Navigate to the verify pending page
            } else {
                if (error.response.data.message){
                    store.dispatch(updateErrMsgAndError({ errMsg: error.response.data.message, error: true }));
                } else {
                    store.dispatch(updateErrMsgAndError({ errMsg: "Network error occured, try again later", error: true }));
                }
            }
        } else {
            store.dispatch(updateErrMsgAndError({ errMsg: "Network error occured, try again later", error: true }));
        }
    }
}

export default loginUser;
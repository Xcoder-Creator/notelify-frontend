import { store } from "@/store";
import { updateMsg, updateOpen } from "@/store/slices/snackbarSlice";
import { updateLoadingScreen, updateUserData } from "@/store/slices/userAuthSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * This method will be used for user authentication.
 * @param router - The next/navigation router object
 * @param page - The page that called the userAuth method
 * @param controllerRef - The abort controller reference
 * @return void
 */
const userAuth = async (router: ReturnType<typeof useRouter>, page: string, controllerRef: React.RefObject<AbortController | null>) => {
    // Cancel any pending requests and reset the abort controller
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    /*
        If the user is in any of the auth pages, check if
        the loading screen is hidden. If it is, then don't proceed
        with the user authentication.
    */
    if (page === "auth"){
        if (store.getState().userAuth.loadingScreen === false){
            return;
        }
    }

    let accessToken = store.getState().userAuth.userData?.accessToken; // The users access token from redux

    try {
        const res = await axios.post(`/api/auth/user-auth`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken ? accessToken : "access_token"}`
                },
                signal: controllerRef.current.signal
            }
        );

        store.dispatch(updateUserData({ userData: res.data.userData }));

        if (page === "auth" || page === "verify_pending"){
            router.push('/'); // Navigate to the home page
        } else if (page === "main"){
            store.dispatch(updateLoadingScreen({ loadingScreen: false })); // Hide the screen loader
        }
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
                if (error.response.data.isLoggedIn){
                    store.dispatch(updateOpen(true));
                    store.dispatch(updateMsg(error.response.data.message));
                } else {
                    if (page === "auth"){
                        store.dispatch(updateLoadingScreen({ loadingScreen: false })); // Hide the loading screen
                    } else if (page === "main" || page === "verify_pending"){
                        router.push('/auth/login');
                    }
                }
            } else {
                store.dispatch(updateOpen(true));
                store.dispatch(updateMsg("A network error has occured, please try again later!"));
            }
        } else {
            store.dispatch(updateOpen(true));
            store.dispatch(updateMsg("A network error has occured, please try again later!"));
        }
    }
}

export default userAuth;
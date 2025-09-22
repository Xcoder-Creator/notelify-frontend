"use client";

import React, { useEffect, useRef, useState } from "react";
import auth_styles from '@/components/auth/Auth.module.css';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { updateEmailForAccountVerification, updateErrMsgAndError, updateLoadingScreen, updateSuccessMsgAndSuccess, updateVerifyPending } from "@/store/slices/userAuthSlice";
import forceLightTheme from "@/lib/theme/forceLightTheme";
import ScreenLoader from "@/components/ScreenLoader";
import BackgroundCheckSVG from "@/components/svg-comp/BackgroundCheck";
import Link from "next/link";
import resendVerificationLink from "@/api/auth/resendVerificationLink";
import { CircularProgress } from "@mui/material";
import AlertSnackbar from "@/components/AlertSnackbar";
import { updateMsg, updateOpen } from "@/store/slices/snackbarSlice";
import userAuth from "@/api/auth/userAuth";

/**
 * This is the verify pending page.
 */
export default function VerifyPending() {
    const dispatch = useAppDispatch();
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const verifyPending = useAppSelector((state) => state.userAuth.verifyPending);
    const emailForAccountVerification = useAppSelector((state) => state.userAuth.emailForAccountVerification);
    const router = useRouter();
    const controllerRef = useRef<AbortController | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const error = useAppSelector((state) => state.userAuth.error);
    const success = useAppSelector((state) => state.userAuth.success);

    // This method will trigger the resend request
    const resendLink = async () => {
        if (!isSubmitting){
            setIsSubmitting(true);
            await resendVerificationLink(controllerRef, setIsSubmitting);
        }
    }

    useEffect(() => {
        forceLightTheme();
        
        if (verifyPending && emailForAccountVerification){
            dispatch(updateLoadingScreen({ loadingScreen: false }));
        } else {
            dispatch(updateLoadingScreen({ loadingScreen: true }));
            const run = async () => {
                await userAuth(router, "verify_pending", controllerRef);
            }
            run();
        }

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
            dispatch(updateVerifyPending({ value: false }));
            dispatch(updateEmailForAccountVerification({ email: null }));
            dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
            dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
            dispatch(updateMsg(""));
            dispatch(updateOpen(false));
        }
    }, []);

    if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            <div className={auth_styles.auth_page_root2}>
                <div className={auth_styles.box_container}>
                    <BackgroundCheckSVG className={auth_styles.bg_check_icon} />

                    <p className={auth_styles.title_text}>Verify Your Account</p>
                    
                    <p className={auth_styles.box_container_text}>
                        We've sent a verification link to your email. Please check your inbox and follow
                        the instructions to verify your account before logging in.
                    </p>     

                    <button 
                        type="button" 
                        disabled={isSubmitting}
                        className={isSubmitting ? auth_styles.disabled_continue_btn : auth_styles.continue_btn}
                        onClick={resendLink}
                    >   
                        {
                            isSubmitting ?
                                <CircularProgress size={20} sx={{ color: "white" }} thickness={5} color="primary" /> 
                            :   "Resend Verification Email"
                        }
                    </button>
                    
                    <Link href="/auth/login" className={[auth_styles.next_auth_link, auth_styles.next_auth_link_label].join(' ')}>
                        Go back to login
                    </Link>
                </div>
            </div>

            <AlertSnackbar autoHideDuration={3000} vertical="bottom" horizontal="center" severity={error ? "error" : success ? "success" : "info"} />
        </div>
    );
}
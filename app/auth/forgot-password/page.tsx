"use client";

import React, { useEffect, useRef } from "react";
import auth_styles from '@/components/auth/Auth.module.css';
import find_your_account_styles from '@/components/auth/FindYourAccount.module.css';
import Image from "next/image";
import Link from "next/link";
import forceLightTheme from "@/lib/theme/forceLightTheme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateErrMsgAndError, updateLoadingScreen, updateSuccessMsgAndSuccess, updateWarningMsgAndWarning } from "@/store/slices/userAuthSlice";
import { useRouter } from "next/navigation";
import userAuth from "@/api/auth/userAuth";
import ScreenLoader from "@/components/ScreenLoader";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import sendResetPasswordLink from "@/api/auth/sendResetPasswordLink";
import { Alert, CircularProgress } from "@mui/material";

// The forgot password form schema object
const schema = z.object({
    emailOrUsername: z.string().min(1, "Email or Username is required")
});

type FormData = z.infer<typeof schema>;

/**
 * This is the forgot password page.
 */
export default function ForgotPassword() {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userAuth.userData);
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const error = useAppSelector((state) => state.userAuth.error);
    const errMsg = useAppSelector((state) => state.userAuth.errMsg);
    const success = useAppSelector((state) => state.userAuth.success);
    const successMsg = useAppSelector((state) => state.userAuth.successMsg);
    const warning = useAppSelector((state) => state.userAuth.warning);
    const warningMsg = useAppSelector((state) => state.userAuth.warningMsg);
    const controllerRef = useRef<AbortController | null>(null);
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors, isSubmitting  } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    // This method is called when the form validation is successfull
    const onSubmit = async (data: FormData) => await sendResetPasswordLink(data, router, controllerRef);

    // Button is disabled if any errors exist
    const hasErrors = Object.keys(errors).length > 0;
    
    useEffect(() => {
        forceLightTheme();

        if (userData){
            dispatch(updateLoadingScreen({ loadingScreen: true }));
            router.push('/');
        } else {
            const run = async () => {
                await userAuth(router, "auth", controllerRef);
            }
            run();
        }

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
            dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
            dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
            dispatch(updateWarningMsgAndWarning({ warningMsg: null, warning: false }));
        }
    }, []);

    if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            <div className={find_your_account_styles.find_your_account_page_root}>
                <div className={find_your_account_styles.auth_container}>
                    <Image
                        className={auth_styles.logo}
                        src="/app.png"
                        alt="Logo"
                        width={65}
                        height={65}
                    />
                    
                    <p className={auth_styles.title_text}>Forgot Your Password?</p>
                    
                    <p className={auth_styles.sub_txt}>Provide your email or username below so that we can send you a password reset link.</p>

                    {
                        error ?
                            <Alert
                                sx={{
                                    width: '100%'
                                }} 
                                variant="filled" 
                                severity="error"
                                onClose={() => dispatch(updateErrMsgAndError({ errMsg: null, error: false }))}
                            >
                                {errMsg}
                            </Alert>
                        :   <></>
                    }

                    {
                        success ?
                            <Alert
                                sx={{
                                    width: '100%'
                                }} 
                                variant="filled" 
                                severity="success"
                                onClose={() => dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }))}
                            >
                                {successMsg}
                            </Alert>
                        :   <></>
                    }

                    {
                        warning ?
                            <Alert
                                sx={{
                                    width: '100%'
                                }} 
                                variant="filled" 
                                severity="warning"
                                onClose={() => dispatch(updateWarningMsgAndWarning({ warningMsg: null, warning: false }))}
                            >
                                {warningMsg}
                            </Alert>
                        :   <></>
                    }

                    <form onSubmit={handleSubmit(onSubmit)} className={auth_styles.form_section}>
                        <input disabled={isSubmitting} className={[auth_styles.input_field, errors.emailOrUsername ? auth_styles.err_input_field : ''].join(' ')} {...register("emailOrUsername")} placeholder="Email address or Username" type="text" />
                        {errors.emailOrUsername && <p className={auth_styles.error_msg}>{errors.emailOrUsername.message + '.'}</p>}

                        <button 
                            type="submit" 
                            disabled={hasErrors || isSubmitting}
                            className={hasErrors || isSubmitting ? auth_styles.disabled_continue_btn : auth_styles.continue_btn}
                        >
                            {
                                isSubmitting ?
                                    <CircularProgress size={20} sx={{ color: "white" }} thickness={5} color="primary" /> 
                                :   "Continue"
                            }
                        </button>

                        <Link href="/auth/login" className={[auth_styles.next_auth_link, auth_styles.next_auth_link_label].join(' ')}>
                            Go back to login
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
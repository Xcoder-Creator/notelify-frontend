"use client";

import React, { useEffect, useRef, useState } from "react";
import auth_styles from '@/components/auth/Auth.module.css';
import Image from "next/image";
import reset_password_styles from '@/components/auth/ResetPassword.module.css';
import EyeSVG from "@/components/svg-comp/Eye";
import forceLightTheme from "@/lib/theme/forceLightTheme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ScreenLoader from "@/components/ScreenLoader";
import { updateErrMsgAndError, updateLoadingScreen, updateSuccessMsgAndSuccess, updateWarningMsgAndWarning } from "@/store/slices/userAuthSlice";
import { useParams } from "next/navigation";
import checkResetPasswordToken from "@/api/auth/checkResetPasswordToken";
import CloseCircleSVG from "@/components/svg-comp/CloseCircle";
import BackgroundCheckSVG from "@/components/svg-comp/BackgroundCheck";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Alert, CircularProgress } from "@mui/material";
import resetPassword from "@/api/auth/resetPassword";

// The reset password form schema object
const schema = z.object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters long').max(15, 'Password cannot be longer than 15 characters'),
    confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"] // error is shown on confirmNewPassword field
});

type FormData = z.infer<typeof schema>;

/**
 * This is the reset password page.
 */
export default function ResetPassword() {
    const dispatch = useAppDispatch();
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const controllerRef = useRef<AbortController | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [errorTitle, setErrorTitle] = useState<string | null>(null);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const errorState = useAppSelector((state) => state.userAuth.error);
    const errMsgState = useAppSelector((state) => state.userAuth.errMsg);
    const params = useParams();

    const { register, handleSubmit, formState: { errors, isSubmitting  } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    // This method is called when the form validation is successfull
    const onSubmit = async (data: FormData) => await resetPassword(params.token, { newPassword: data.newPassword }, setError, setErrorTitle, setErrMsg, setSuccess, controllerRef);

    // Button is disabled if any errors exist
    const hasErrors = Object.keys(errors).length > 0;
    
    useEffect(() => {
        forceLightTheme();
        dispatch(updateLoadingScreen({ loadingScreen: true }));

        const token = params.token; // Get the token from route param

        const run = async () => {
            await checkResetPasswordToken(token, setError, setErrorTitle, setErrMsg, setSuccess, controllerRef);
        }

        run();

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
            dispatch(updateLoadingScreen({ loadingScreen: true }));
            dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
            dispatch(updateSuccessMsgAndSuccess({ successMsg: null, success: false }));
            dispatch(updateWarningMsgAndWarning({ warningMsg: null, warning: false }));
        }
    }, []);

    if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            {
                error ? 
                    <>
                        <div className={auth_styles.auth_page_root2}>
                            <div className={auth_styles.box_container}>
                                <CloseCircleSVG className={auth_styles.bg_check_icon_error} />

                                <p className={auth_styles.title_text}>{errorTitle}</p>
                                
                                <p className={auth_styles.box_container_text}>
                                    {errMsg}
                                </p> 
                                
                                <Link href="/auth/forgot-password" className={[auth_styles.next_auth_link, auth_styles.next_auth_link_label].join(' ')}>
                                    New reset password link
                                </Link>
                            </div>
                        </div>
                    </>
                :   <>
                        {
                            success ?
                                <>
                                    <div className={auth_styles.auth_page_root2}>
                                        <div className={auth_styles.box_container}>
                                            <BackgroundCheckSVG className={auth_styles.bg_check_icon} />

                                            <p className={auth_styles.title_text}>Password Reset Successfull</p>
                                            
                                            <p className={auth_styles.box_container_text}>
                                                Your password has been reset successfully. You can now log in to your account below.
                                            </p> 
                                            
                                            <Link href="/auth/login" className={[auth_styles.next_auth_link, auth_styles.next_auth_link_label].join(' ')}>
                                                Go to login
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            :   <div className={reset_password_styles.reset_password_page_root}>
                                    <div className={reset_password_styles.auth_container}>
                                        <Image
                                            className={auth_styles.logo}
                                            src="/app.png"
                                            alt="Logo"
                                            width={65}
                                            height={65}
                                        />
                                        
                                        <p className={auth_styles.title_text}>Reset Your Password</p>
                                        
                                        <p className={auth_styles.sub_txt}>Provide a new password below in order to reset your accounts password.</p>

                                        {
                                            errorState ?
                                                <Alert 
                                                    sx={{
                                                        width: '100%'
                                                    }} 
                                                    variant="filled" 
                                                    severity="error"
                                                    onClose={() => dispatch(updateErrMsgAndError({ errMsg: null, error: false }))}
                                                >
                                                    {errMsgState}
                                                </Alert>
                                            :   <></>
                                        }

                                        <form onSubmit={handleSubmit(onSubmit)} className={auth_styles.form_section}>
                                            <div className={auth_styles.password_input_container}>
                                                <input disabled={isSubmitting} className={auth_styles.password_input_field} {...register("newPassword")} placeholder="New password" type="password" />

                                                <button className={auth_styles.eye_button}>
                                                    <EyeSVG className={auth_styles.eye_svg} />
                                                </button>
                                            </div>
                                            {errors.newPassword && <p className={auth_styles.error_msg}>{errors.newPassword.message + '.'}</p>}

                                            <div className={auth_styles.password_input_container}>
                                                <input disabled={isSubmitting} className={auth_styles.password_input_field} {...register("confirmNewPassword")} placeholder="Confirm new password" type="password" />

                                                <button className={auth_styles.eye_button}>
                                                    <EyeSVG className={auth_styles.eye_svg} />
                                                </button>
                                            </div>
                                            {errors.confirmNewPassword && <p className={auth_styles.error_msg}>{errors.confirmNewPassword.message + '.'}</p>}

                                            <button 
                                                type="submit" 
                                                disabled={hasErrors || isSubmitting}
                                                className={hasErrors || isSubmitting ? auth_styles.disabled_continue_btn : auth_styles.continue_btn}
                                            >
                                                {
                                                    isSubmitting ?
                                                        <CircularProgress size={20} sx={{ color: "white" }} thickness={5} color="primary" /> 
                                                    :   "Reset Password"
                                                }
                                            </button>
                                        </form>
                                    </div>
                                </div>
                        }
                    </>
            }
        </div>
    );
}
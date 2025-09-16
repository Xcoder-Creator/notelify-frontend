"use client";

import React, { useEffect, useRef } from "react";
import auth_styles from '@/components/auth/Auth.module.css';
import NotesIllustrationSVG from "@/components/svg-comp/NotesIllustration";
import Image from "next/image";
import Link from "next/link";
import EyeSVG from "@/components/svg-comp/Eye";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginUser from "@/api/auth/loginUser";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Alert, CircularProgress } from "@mui/material";
import { updateErrMsgAndError, updateLoadingScreen } from "@/store/slices/userAuthSlice";
import forceLightTheme from "@/lib/forceLightTheme";
import ScreenLoader from "@/components/ScreenLoader";
import userAuth from "@/api/auth/userAuth";

// The login form schema object
const schema = z.object({
    emailOrUsername: z.string().min(1, "Email or Username is required").trim().nonempty("Email or username cannot be empty"),
    password: z.string().min(1, "Password must be at least 6 characters long").trim().nonempty("Password cannot be empty")
});

type FormData = z.infer<typeof schema>;

/**
 * This is the login page.
 */
export default function Login() {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.userAuth.error);
    const errMsg = useAppSelector((state) => state.userAuth.errMsg);
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const userData = useAppSelector((state) => state.userAuth.userData);
    const router = useRouter();
    const controllerRef = useRef<AbortController | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting  } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    // This method is called when the form validation is successfull
    const onSubmit = async (data: FormData) => await loginUser(dispatch, data, router, controllerRef);

    // Button is disabled if any errors exist
    const hasErrors = Object.keys(errors).length > 0;

    useEffect(() => {
        forceLightTheme(dispatch);

        if (userData){
            dispatch(updateLoadingScreen({ loadingScreen: true }));
            router.push('/');
        } else {
            const run = async () => {
                await userAuth(dispatch, router, "auth", controllerRef);
            }
            run();
        }

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
            dispatch(updateErrMsgAndError({ errMsg: null, error: false }));
        }
    }, []);

    if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            <div className={auth_styles.auth_page_root}>
                <div className={auth_styles.auth_container_section}>
                    <div className={auth_styles.auth_container}>
                        <Image
                            className={auth_styles.logo}
                            src="/app.png"
                            alt="Logo"
                            width={65}
                            height={65}
                        />
                        
                        <p className={auth_styles.title_text}>Sign in</p>
                        
                        <p className={auth_styles.sub_txt}>to continue to your Notelify account.</p>

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

                        <form onSubmit={handleSubmit(onSubmit)} className={auth_styles.form_section}>
                            <input disabled={isSubmitting} className={[auth_styles.input_field, errors.emailOrUsername ? auth_styles.err_input_field : ''].join(' ')} {...register("emailOrUsername")} placeholder="Email address or Username" type="email" />
                            {errors.emailOrUsername && <p className={auth_styles.error_msg}>{errors.emailOrUsername.message + '.'}</p>}

                            <div className={[auth_styles.password_input_container, errors.password ? auth_styles.err_input_field : ''].join(' ')}>
                                <input disabled={isSubmitting} className={auth_styles.password_input_field} {...register("password")} placeholder="Password" type="password" />

                                <button type="button" className={auth_styles.eye_button}>
                                    <EyeSVG className={auth_styles.eye_svg} />
                                </button>
                            </div>
                            {errors.password && <p className={auth_styles.error_msg}>{errors.password.message + '.'}</p>}

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

                            <Link href="/auth/forgot-password" className={[auth_styles.next_auth_link, auth_styles.next_auth_link_label].join(' ')}>
                                Forgot your password? click here
                            </Link>
                        </form>

                        <div className={auth_styles.or_label}>
                            <div className={auth_styles.line}></div>
                            <span className={auth_styles.or_text}>or</span>
                            <div className={auth_styles.line}></div>
                        </div>

                        <div className={auth_styles.alternate_signup_options}>
                            <button className={[auth_styles.alternate_option_btn, auth_styles.mr, auth_styles.mb].join(' ')}>
                                <Image
                                    className={auth_styles.alternate_option_btn_icon}
                                    src="/google.png"
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                />      
                                
                                <p className={auth_styles.alternate_option_btn_text}>Continue with Google</p>
                            </button>

                            <button className={[auth_styles.alternate_option_btn, auth_styles.ml].join(' ')}>
                                <Image
                                    className={auth_styles.alternate_option_btn_icon}
                                    src="/apple.png"
                                    alt="Apple logo"
                                    width={40}
                                    height={40}
                                />      
                                
                                <p className={auth_styles.alternate_option_btn_text}>Continue with Apple</p>
                            </button>
                        </div>

                        <Link href="/auth/signup" className={auth_styles.next_auth_link}>
                            Don't have an account? <span className={auth_styles.next_auth_link_label}>Sign up</span>
                        </Link>
                    </div>
                </div>

                <div className={auth_styles.vector_section}>
                    <div className={auth_styles.caption_block}>
                        <p className={auth_styles.caption}>Work. Play. Plans.</p>
                        <p className={[auth_styles.caption, auth_styles.caption_bold].join(' ')}>Remember them all</p>
                    </div>

                    <NotesIllustrationSVG className={auth_styles.vector} />
                </div>
            </div>
        </div>
    );
}
"use client";

import React, { useEffect, useRef } from "react";
import auth_styles from '@/components/auth/Auth.module.css';
import NotesIllustrationSVG from "@/components/svg-comp/NotesIllustration";
import Image from "next/image";
import Link from "next/link";
import EyeSVG from "@/components/svg-comp/Eye";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import registerUser from "@/api/auth/registerUser";
import { Alert, CircularProgress } from "@mui/material";
import { updateErrMsgAndError, updateLoadingScreen, updateSuccessMsgAndSuccess } from "@/store/slices/userAuthSlice";
import { useRouter } from "next/navigation";
import forceLightTheme from "@/lib/forceLightTheme";
import userAuth from "@/api/auth/userAuth";
import ScreenLoader from "@/components/ScreenLoader";

// The signup form schema object
const schema = z.object({
    email: z.string().email({ error: "Please enter a valid email address" }),
    username: z.string().min(5, 'Username must be at least 5 characters long').max(15, 'Username cannot be longer than 15 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(15, 'Password cannot be longer than 15 characters')
});

type FormData = z.infer<typeof schema>;

/**
 * This is the signup page.
 */
export default function Signup() {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.userAuth.error);
    const errMsg = useAppSelector((state) => state.userAuth.errMsg);
    const success = useAppSelector((state) => state.userAuth.success);
    const successMsg = useAppSelector((state) => state.userAuth.successMsg);
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const userData = useAppSelector((state) => state.userAuth.userData);
    const controllerRef = useRef<AbortController | null>(null);
    const router = useRouter(); 

    const { register, handleSubmit, formState: { errors, isSubmitting  } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    // This method is called when the form validation is successfull
    const onSubmit = async (data: FormData) => await registerUser(dispatch, data, router, controllerRef);

    // Button is disabled if any errors exist
    const hasErrors = Object.keys(errors).length > 0;

    useEffect(() => {
        forceLightTheme(dispatch); // Force light mode
        
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
                        
                        <p className={auth_styles.title_text}>Welcome to Notelify!</p>
                        
                        <p className={auth_styles.sub_txt}>Sign up and start taking notes.</p>

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

                        <form onSubmit={handleSubmit(onSubmit)} className={auth_styles.form_section}>
                            <input disabled={isSubmitting} {...register("email")} className={[auth_styles.input_field, errors.email ? auth_styles.err_input_field : ''].join(' ')} placeholder="Email address" type="email" />
                            {errors.email && <p className={auth_styles.error_msg}>{errors.email.message + '.'}</p>}

                            <input disabled={isSubmitting} {...register("username")} className={[auth_styles.input_field, errors.username ? auth_styles.err_input_field : ''].join(' ')} placeholder="Username" type="username" />
                            {errors.username && <p className={auth_styles.error_msg}>{errors.username.message + '.'}</p>}

                            <div className={[auth_styles.password_input_container, errors.password ? auth_styles.err_input_field : ''].join(' ')}>
                                <input disabled={isSubmitting} {...register("password")} className={auth_styles.password_input_field} placeholder="Password" type="password" />

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

                        <div className={auth_styles.legal_block}>
                            By creating an account, you are agreeing to our <Link href="/" className={auth_styles.legal_link}>Terms of Service</Link> and acknowledging receipt of our <Link href="/" className={auth_styles.legal_link}>Privacy Policy</Link>.
                        </div>

                        <Link href="/auth/login" className={auth_styles.next_auth_link}>
                            Already have an account? <span className={auth_styles.next_auth_link_label}>Log in</span>
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
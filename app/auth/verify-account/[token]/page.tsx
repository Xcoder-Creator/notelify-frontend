"use client";

import React, { useEffect, useRef, useState } from "react";
import auth_styles from '@/components/auth/Auth.module.css';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { updateLoadingScreen } from "@/store/slices/userAuthSlice";
import forceLightTheme from "@/lib/theme/forceLightTheme";
import ScreenLoader from "@/components/ScreenLoader";
import BackgroundCheckSVG from "@/components/svg-comp/BackgroundCheck";
import Link from "next/link";
import verifyAccount from "@/api/auth/verifyAccount";
import CloseCircleSVG from "@/components/svg-comp/CloseCircle";

/**
 * This is the verify account page.
 */
export default function VerifyAccount() {
    const dispatch = useAppDispatch();
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const router = useRouter();
    const controllerRef = useRef<AbortController | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorTitle, setErrorTitle] = useState<string | null>(null);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const params = useParams();

    useEffect(() => {
        forceLightTheme();
        dispatch(updateLoadingScreen({ loadingScreen: true }));

        const token = params.token; // Get the token from route param

        const run = async () => {
            await verifyAccount(router, token, setError, setErrorTitle, setErrMsg, controllerRef);
        }

        run();

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
            dispatch(updateLoadingScreen({ loadingScreen: true }));
        }
    }, []);

    if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            <div className={auth_styles.auth_page_root2}>
                <div className={auth_styles.box_container}>
                    {
                        error ? (
                            <CloseCircleSVG className={auth_styles.bg_check_icon_error} />
                        ) : (
                            <BackgroundCheckSVG className={auth_styles.bg_check_icon} />
                        )
                    }

                    <p className={auth_styles.title_text}>{error ? errorTitle : "Account Verified"}</p>
                    
                    <p className={auth_styles.box_container_text}>
                        {error ? errMsg : "Your account has been successfully verified. You can now log in to your account below."}
                    </p> 
                    
                    <Link href="/auth/login" className={[auth_styles.next_auth_link, auth_styles.next_auth_link_label].join(' ')}>
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    );
}
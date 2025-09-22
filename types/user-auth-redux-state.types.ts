/** 
 * Interface for the users data. 
 */
export interface UserData {
    /** The users ID */
    userID: string; 

    /** The users email address */
    email: string;

    /** The users name */
    username: string;

    /** The users profile image */
    profileImage: string | null;

    /** The verified status of the users account */
    verified: boolean;

    /** The users access token */
    accessToken: string;
}

/** 
 * Interface for the auth API redux state. 
 */
export interface UserAuthReduxStateProps {
    /** The users data */
    userData: UserData | null;

    /** The error message from the backend API */
    errMsg: string | null;

    /** The error state */
    error: boolean;

    /** The success message from the backend API */
    successMsg: string | null;

    /** The success state */
    success: boolean;

    /** The info message from the backend API */
    warningMsg: string | null;

    /** The warning state */
    warning: boolean;

    /** Controls the state of the loading screen */
    loadingScreen: boolean;

    /** 
     * The state of the verify pending page that 
     * displays after a successful account creation 
     */
    verifyPending: boolean;

    /** 
     * The state of the verify account page that 
     * displays when the user is verifying their account
     */
    verifyAccount: boolean;

    /** The email address for account verification */
    emailForAccountVerification: string | null;
}
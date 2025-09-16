"use client";

import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateOpen } from "@/store/slices/snackbarSlice";
import CloseSVG from "@/components/svg-comp/Close";

interface SnackbarProps {
    /**
     * The number of milliseconds to wait before automatically calling the onClose function. 
     * onClose should then set the state of the open prop to hide the Snackbar. 
     * This behavior is disabled by default with the null value.
     */
    autoHideDuration: number | null | undefined;

    /** Vertical alignment of the snackbar */
    vertical: "bottom" | "top";

    /** Horizontal alignment of the snackbar */
    horizontal: "center" | "left" | "right";

    /** The undo button of the snackbar */
    undoBtn: boolean;
}

/**
 * The snackbar made from MUI snackbar component
 */
export default function SnackbarComp({ autoHideDuration, vertical, horizontal, undoBtn }: SnackbarProps) {
    const dispatch = useAppDispatch();
    const snackbarOpen = useAppSelector((state) => state.snackbar.open);
    const snackbarMsg = useAppSelector((state) => state.snackbar.msg); 

    // Close the snackbar
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(updateOpen(false)); // Close the snackbar
    };

    const action = (
        <React.Fragment>
            {
                undoBtn ?
                    <Button 
                        style={{ 
                            textTransform: 'capitalize', 
                            fontWeight: 'bold' 
                        }} 
                        color="secondary" 
                        size="medium" 
                        onClick={handleClose}
                    >
                        Undo
                    </Button>
                :   null
            }
            
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseSVG 
                    style={{ 
                        width: '20px', 
                        height: '20px' 
                    }} 
                />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            message={snackbarMsg}
            action={action}
            anchorOrigin={{
                vertical: vertical,
                horizontal: horizontal,
            }}
            sx={{
                '& .MuiSnackbarContent-root': {
                    width: '452px',
                    paddingLeft: '20px',
                    paddingTop: '15px',
                    paddingRight: '20px',
                    paddingBottom: '15px'
                }
            }}
        />
    );
}
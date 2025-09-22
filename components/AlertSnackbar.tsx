"use client";

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateOpen } from "@/store/slices/snackbarSlice";
import { Alert } from '@mui/material';
import { AlertSnackbarProps } from '@/types/alert-snackbar.types';

/**
 * The alert snackbar made from MUI snackbar component
 */
export default function AlertSnackbar({ autoHideDuration, vertical, horizontal, severity }: AlertSnackbarProps) {
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

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            message={snackbarMsg}
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
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '452px' }}
            >
                {snackbarMsg}
            </Alert>
        </Snackbar>
    );
}
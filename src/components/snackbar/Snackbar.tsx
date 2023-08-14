/* eslint-disable react/display-name */
import React, { PropsWithChildren, useCallback, useState } from 'react';

import { Snackbar, Alert, Slide, SnackbarCloseReason } from '@mui/material';

import { snackSeverity, SnackSeverityTypes } from './SnackSeverityTypes';

export type WithSnackbarProps = {
  snackbarShowMessage: (
    duration: number,
    message: string,
    severity: SnackSeverityTypes
  ) => unknown;
};

export const withSnack =
  <T extends WithSnackbarProps>(
    WrappedComponent: React.ComponentType<T>
  ): React.FC<Omit<T, keyof WithSnackbarProps>> =>
  (
    props: PropsWithChildren<Pick<T, Exclude<keyof T, 'snackbarShowMessage'>>>
  ) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(2000);
    const [severity, setSeverity] = useState<SnackSeverityTypes>(
      snackSeverity.success
    );

    const showMessage = useCallback(
      (
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-shadow
        duration: number,
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-shadow
        message: string,
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-shadow
        severity: SnackSeverityTypes
      ) => {
        setMessage(message);
        setSeverity(severity);
        setDuration(duration);
        setOpen(true);
      },
      []
    );

    const handleClose = (event: unknown, reason: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        {/* TODO: Fix this the next time the file is edited. */}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...(props as T)} snackbarShowMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          autoHideDuration={duration}
          onClose={handleClose}
          open={open}
          TransitionComponent={Slide}
        >
          <Alert
            onClose={() => handleClose({}, 'timeout')}
            severity={severity}
            variant="filled"
          >
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };

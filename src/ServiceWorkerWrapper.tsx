import React, { FC, useEffect } from 'react';
import { Snackbar, Button, makeStyles, Theme } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import * as serviceWorker from './serviceWorkerRegistration';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
      marginLeft: theme.spacing(2)
    },
  }));
  
const ServiceWorkerWrapper: FC = () => {
    const [showReload, setShowReload] = React.useState(false);
    const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null);

    const classes = useStyles();

    const onSWUpdate = (registration: ServiceWorkerRegistration) => {
      setShowReload(true);
      setWaitingWorker(registration.waiting);
    };
  
    useEffect(() => {
      serviceWorker.register({ onUpdate: onSWUpdate });
    }, []);
  
    const reloadPage = () => {
      waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
      setShowReload(false);
      window.location.reload();
    };
  
    return (
      <Snackbar
        open={showReload}
        message="A new version is available!"
        onClick={reloadPage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert severity="info">
                A new Version is available!
                <Button
            color="inherit"
            size="small"
            onClick={reloadPage}
            className={classes.button}
          >
            Reload
          </Button>
        </MuiAlert>
      </Snackbar>
    );
  }
  
  export default ServiceWorkerWrapper;
import React, { FC, useEffect, useState } from "react";
import { Online, Offline } from 'react-detect-offline';
import { ApolloClient, ApolloProvider } from "@apollo/client";

import header from "./assets/mike.svg";
import footer from "./assets/rail_cargo.svg";
import WifiOffIcon from '@material-ui/icons/WifiOff';
import WifiIcon from '@material-ui/icons/Wifi';

import { Provider as OfflineProvider } from './context/OfflineContext';
import UserListContainer from "./components/UserListContainer";
import {
  AppBar,
  IconButton,
  Button,
  makeStyles,
  Toolbar,
  Container,
  Typography,
} from "@material-ui/core";
import ServiceWorkerWrapper from "./ServiceWorkerWrapper";
import MutationReplayService from './MutationReplayService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: "10vh",
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#111B42",
  },
  content: {
    padding: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(1)
  },
  version: {
    marginTop: -10,
  },
  install: {
    padding: `${theme.spacing(2)}px 0`,
    margin: "0 auto",
    minWidth: 300,
    maxWidth: 800,
    display: "flex",
    flexDirection: "row-reverse",
  },
  footer: {
    backgroundColor: "#111B42",
    textAlign: "center",
    lineHeight: "10vh",
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  },
}));

interface Props {
  client: ApolloClient<any>;
}

let deferredPrompt: any;

function App() {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  const classes = useStyles();
  
  const [version, setVersion] = React.useState<string>('');

  useEffect(() => {
    const fetchVersion = async () => {
      const { version } = await (await fetch('version.json')).json();
      setVersion(version);
    }
    fetchVersion();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src={header} alt="logo" />
            </IconButton>
            <Typography variant='body2' className={classes.version}>{`v ${version}`}</Typography>
          </div>
          <Offline><WifiOffIcon style={{marginRight: '10'}}/></Offline>
          <Online><WifiIcon style={{marginRight: '10'}}/></Online>
        </Toolbar>
      </AppBar>
      {installable && (
        <Container className={classes.install}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleInstallClick}
          >
            Install App
          </Button>
        </Container>
      )}
      <Container className={classes.content}>
        <UserListContainer />
      </Container>
      <footer className={classes.footer}>
        <img src={footer} alt="rail cargo austria" />
      </footer>
    </div>
  );
}

const AppWrapper: FC<Props> = ({ client }) => {
  return (
    <OfflineProvider>
      <ApolloProvider client={client}>
        <App />
        <ServiceWorkerWrapper />
        <Online>
          <MutationReplayService />
        </Online>
      </ApolloProvider>
    </OfflineProvider>
  );
};

export default AppWrapper;

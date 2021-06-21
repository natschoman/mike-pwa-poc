import React, { FC, useEffect, useState } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";

import header from "./assets/mike.svg";
import footer from "./assets/rail_cargo.svg";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: "10vh",
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#111B42",
  },
  content: {
    padding: theme.spacing(2),
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
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img src={header} alt="logo" />
          </IconButton>
          <Typography>{version}</Typography>
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
    <ApolloProvider client={client}>
      <App />
      <ServiceWorkerWrapper />
    </ApolloProvider>
  );
};

export default AppWrapper;

import React, { FC, useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import WifiIcon from '@material-ui/icons/Wifi';

import header from './assets/mike.svg';
import footer from './assets/rail_cargo.svg';

import UserListContainer from './components/UserListContainer';
import { AppBar, IconButton, makeStyles, Toolbar, Container } from '@material-ui/core';
import ServiceWorkerWrapper from './ServiceWorkerWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: '10vh'
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#111B42',
  },
  content: {
    padding: theme.spacing(2)
  },
  online: {
    color: '#B3E283'
  },
  offline: {
    color: 'red'
  },
  footer: {
    backgroundColor: '#111B42',
    textAlign: 'center',
    lineHeight: '10vh',
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%'
  }
}));

interface Props {
  client: ApolloClient<any>;
}

const App = () => {

  const[isOnline, setIsOnline] = useState(true)
  
  useEffect(() => {
    window.addEventListener('offline', () => setIsOnline(false));
    window.addEventListener('online', () => setIsOnline(true));
  })

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={header} alt="logo" />
          </IconButton>
          <WifiIcon className={isOnline ? classes.online : classes.offline} />
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <UserListContainer/>
      </Container>
      <footer className={classes.footer}>
        <img src={footer} alt="rail cargo austria" />
      </footer>
    </div>
  );
}

const AppWrapper: FC<Props> = ({client}) => {
  
  return (
    <ApolloProvider client={client}>
      <App/>
      <ServiceWorkerWrapper />
    </ApolloProvider>
    )
}

export default AppWrapper;

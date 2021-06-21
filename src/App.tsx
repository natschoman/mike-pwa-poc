import React, { FC } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import header from './assets/mike.svg';
import footer from './assets/rail_cargo.svg';

import UserListContainer from './components/UserListContainer';
import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: '10vh'
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#111B42',
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

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={header} alt="logo" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="App-content">
        <UserListContainer/>
      </div>
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
    </ApolloProvider>
    )
}

export default AppWrapper;

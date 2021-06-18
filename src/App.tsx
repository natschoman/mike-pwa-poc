import React from 'react';
import { ApolloProvider } from '@apollo/client';

import header from './assets/mike.svg';
import footer from './assets/rail_cargo.svg';

import './App.css';
import { createClient } from './apollo';
import UserListContainer from './components/UserListContainer';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={header} alt="logo" />
      </header>
      <div className="App-content">
        <UserListContainer/>
      </div>
      <footer className="App-footer">
        <img src={footer} alt="rail cargo austria" />
      </footer>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <ApolloProvider client={ createClient() }>
      <App/>
    </ApolloProvider>
    )
}

export default AppWrapper;

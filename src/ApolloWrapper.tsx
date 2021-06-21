// @ts-nocheck
import { useEffect, useState } from 'react'
import { ApolloClient } from '@apollo/client'
import { CircularProgress } from '@material-ui/core';

import getApolloClient from './apollo'
import AppWrapper from './App'

const ApolloWrapper = () => {
  const [client, setClient] = useState<ApolloClient<any>>()

  useEffect(() => {

    const runApolloClient = async () => {
      const client = await getApolloClient()
      setClient(client)
    }
    runApolloClient()
  }, [])

  if(!client){
    return <CircularProgress color="secondary" />
  }

  return <AppWrapper client={client} />
}

export default ApolloWrapper;